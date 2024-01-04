# syntax = docker/dockerfile:1.2

FROM oven/bun:slim as base
WORKDIR /usr/src/app

FROM base AS install
ARG NODE_VERSION=20
RUN apt update \
    && apt install -y curl
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env
COPY ./package.json ./bun.lockb ./
COPY ./prisma ./prisma
COPY ./src ./src
RUN bun install --production
RUN bun run build --production
RUN bun prisma generate

FROM base AS release
COPY --from=install /usr/src/app/ .

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env
ENV NODE_ENV production
ENV PORT 3000
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/server.ts" ]