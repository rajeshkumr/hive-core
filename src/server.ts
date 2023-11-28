import app from "./app";

app.listen(process?.env?.PORT ?? 8080);
console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);