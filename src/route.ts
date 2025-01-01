import type { Action } from "./action.js";
import type { Request } from "./handler.js";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Route = {
  path: string;
  action: Action;
  method: Method;
  params?: Record<string, string>;
};

function createRouteMethod(
  method: Method,
): (path: string, action: Action) => Route {
  return (path, action) => {
    return {
      path,
      action,
      method,
    };
  };
}

export const get = createRouteMethod("GET");
export const post = createRouteMethod("POST");
export const put = createRouteMethod("PUT");
export const patch = createRouteMethod("PATCH");
export const del = createRouteMethod("DELETE");

export const createErrorRoute = (error: string) =>
  get("/", () => new Response(error));

export function extractParams(routePath: string, requestPath: string): Record<string, string> {
  const params: Record<string, string> = {};
  const routeParts = routePath.split('/');
  const pathParts = requestPath.split('/');

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = pathParts[i];
    }
  }

  return params;
}
