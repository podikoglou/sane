import { createController } from "../../src/index.js";

export default createController({
  name: "home",
  actions: {
    index: () => {
      return new Response("Welcome Home! :)");
    },
  },
});
