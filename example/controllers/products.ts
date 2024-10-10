import { createController } from "../../src/index.js";

export default createController({
  name: "products",
  actions: {
    index: () => {
      return new Response("Products should be listed here");
    },
    show: () => {
      return new Response(
        "Product details about a specific product should be shown here",
      );
    },
    new: () => {
      return new Response("Product creation form should be shown here");
    },
    create: () => {
      return new Response(
        "A Product should be created here. This is a RESTful endpoint",
      );
    },
    edit: () => {
      return new Response("Product update form should be shown here");
    },

    update: () => {
      return new Response(
        "A Product should be updated here. This is a RESTful endpoint",
      );
    },
    destroy: () => {
      return new Response(
        "A Product should be deleted here. This is a RESTful endpoint",
      );
    },
  },
});
