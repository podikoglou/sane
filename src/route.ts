import type { Action } from "./action.js";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Route = {
  path: string;
  action: Action;
  method: Method;

  // figure out a way to infer this
  //controller: Controller
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
