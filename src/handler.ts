import type { Application } from "./application.js";
import type { Method } from "./route.js";
import { extractParams } from "./route.js";

export type RequestHandler = (req: Request) => Promise<Response>;

export function createHandler(application: Application): RequestHandler {
  return async (req) => {
    const method = req.method as Method;
    const { pathname } = new URL(req.url);

    // Find matching route
    const route = application.trie.search(pathname);

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    // Check method matches
    if (route.method !== method) {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Extract params if any
    const params = extractParams(route.path, pathname);
    if (Object.keys(params).length > 0) {
      (req as any).params = params;
    }

    try {
      // Execute route action
      return await route.action(req);
    } catch (error) {
      console.error("Error handling request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}
