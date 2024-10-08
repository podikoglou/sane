import home from "./controllers/home.js";
import { createApplication, createHandler, get } from "../src/index.js";

const application = createApplication({
  routes: () => {
    return [get("/", home.actions.index)];
  },
});

const handler = createHandler(application);

Bun.serve({ fetch: handler, port: 3000 });
