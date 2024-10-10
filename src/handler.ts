import type { Action } from "./action.js";
import type { Application } from "./application.js";
import type { Method, Route } from "./route.js";

export type RequestHandler = (req: Request) => Promise<Response>;

export function createHandler(application: Application): RequestHandler {
  const routes: Record<Method, Record<string, Action>> = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
  };

  for (const route of application.routes()) {
    routes[route.method][route.path] = route.action;
  }

  return async (req) => {
    const { method }: { method: Method } = req;
    const { pathname: path } = new URL(req.url);

    const availableRoutes = routes[method];

    // TODO: matching logic

    return new Response();
  };
}
