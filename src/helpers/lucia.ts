import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { elysia } from "lucia/middleware";

const client = new PrismaClient();

// default values
const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
	middleware: elysia(),
	adapter: prisma(client, {
		user: "user", // model User {}
		key: "key", // model Key {}
		session: "session" // model Session {}
	}),
  getUserAttributes: (data) => {
		return {
			userName: data.username
		};
	}

});

export type Auth = typeof auth;
export default auth;