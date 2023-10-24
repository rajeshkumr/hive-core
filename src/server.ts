import app from "./app";

app.listen(Bun.env.PORT ?? 8080);
console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);