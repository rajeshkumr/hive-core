import { Elysia } from "elysia";
import routes from "./routes";

const app = new Elysia();

app.use(routes);

export default app;