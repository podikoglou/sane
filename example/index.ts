import home from "./controllers/home.js";
import { createApplication, get } from "../src/index.js";

export default createApplication({
  routes: () => {
    return [get("/", home.actions.index)];
  },
});
