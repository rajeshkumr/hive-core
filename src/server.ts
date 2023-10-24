import { Elysia } from "elysia";
import app from "./app";

const elysia = new Elysia();

elysia.use(app);
elysia.listen(Bun.env.PORT || 3000);
console.log(
  `Server is running at ${elysia.server?.hostname}:${elysia.server?.port}`
);