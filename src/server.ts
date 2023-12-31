import app from "./app";

app.listen(process?.env?.PORT ?? 3000);
console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `ENV variables ${JSON.stringify(process.env)}`
);