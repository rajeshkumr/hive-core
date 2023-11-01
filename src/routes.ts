import { Elysia, t } from "elysia";
import { googleAuth, facebookAuth } from "./controllers/login";
import { serializeCookie } from "lucia/utils";

const routes = new Elysia({
  prefix: "/v1"
});

routes.state("version", 1)

.get("/", (context) => {
  console.log(context);
  return context;
})

.onParse(({ request }, contentType) => {
  if (contentType === 'application/custom-type')
      return request.text()
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

.get("/auth/facebook", async() => {
  const [url, state] = await facebookAuth.getAuthorizationUrl();
	const stateCookie = serializeCookie("github_oauth_state", state, {
		httpOnly: true,
		secure: false, // `true` for production
		path: "/",
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			"Set-Cookie": stateCookie
		}
	});
})
.get("/auth/google",  async() => {
  const [url, state] = await googleAuth.getAuthorizationUrl();
	const stateCookie = serializeCookie("github_oauth_state", state, {
		httpOnly: true,
		secure: false, // `true` for production
		path: "/",
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			"Set-Cookie": stateCookie
		}
	});
})

export default routes;