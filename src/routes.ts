import { Elysia, t } from "elysia";

const routes = new Elysia({
  prefix: "/v1"
});

routes.state("version", 1);

routes.onParse(({ request }, contentType) => {
  if (contentType === 'application/custom-type')
      return request.text()
});

routes.get("/", (context) => {
  console.log(context);
  return context;
})

.route("custom", ["/"], (context) => {
  console.log(context);
  return context;
})


.get("/id/:id", ({ params: { id } }) => {
  console.log(id);
  return id;
},
{
  params: t.Object({
    id: t.Numeric()
}),
  response: {
      200: t.Number(),
      400: t.Null()
  }
})

export default routes;