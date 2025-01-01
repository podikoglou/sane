import {
  createApplication,
  createHandler,
  del,
  get,
  post,
  put,
} from "../src/index.js";
import home from "./controllers/home.js";
import products from "./controllers/products.js";

const application = createApplication({
  routes: () => [
      get("/", home.actions.index),

      get("/products", products.actions.index),
      get("/products/new", products.actions.new),
      get("/products/:id", products.actions.show),
      get("/products/:id/edit", products.actions.edit),

      post("/products", products.actions.create),
      put("/products/:id", products.actions.update),

      del("/products/:id", products.actions.destroy),
    ];
  },
});

const handler = createHandler(application);

Bun.serve({ fetch: handler, port: 3000 });
