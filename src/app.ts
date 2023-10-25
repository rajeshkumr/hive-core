import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { apollo, gql } from "@elysiajs/apollo";
import { staticPlugin } from "@elysiajs/static";

import routes from "./routes";
import { facebookAuth, googleAuth } from "./helpers/passport";

const app = new Elysia();

facebookAuth();
googleAuth();
app.use(swagger());
app.use(cors());
// Allows app to strictly send string based response
// app.guard({
//   response: t.String()
// });
app.use( apollo({
  typeDefs: gql`
      type Book {
          title: String
          author: String
      }

      type Query {
          books: [Book]
      }
  `,
  resolvers: {
      Query: {
          books: () => {
              return [
                  {
                      title: 'Elysia',
                      author: 'saltyAom'
                  }
              ]
          }
      }
  }
}));
app.use(staticPlugin());
app.use(routes);

app.get("/", (context) => {
  console.log(context);
  return context;
});

export default app;