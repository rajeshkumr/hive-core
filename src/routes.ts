import { Elysia } from "elysia";

const routes = new Elysia({
  prefix: "/v1"
});

routes.state("version", 1);

routes.get("/", (context) => {
  console.log(context);
  return context;
})

.route("custom", ["/"], (context) => {
  console.log(context);
  return context;
})


.get("/id/:id", (context) => {
  console.log(context);
  return context;
})

export default routes;