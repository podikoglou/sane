import type { Action } from "./action.js";

export type Route = {
  path: string;
  action: Action;

  // figure out a way to infer this
  //controller: Controller
};

export type GetRoute = Route & { method: "GET" };

export function get(path: string, action: Action): GetRoute {
  return { path, action, method: "GET" };
}

export type PostRoute = Route & { method: "POST" };

export function post(path: string, action: Action): PostRoute {
  return { path, action, method: "POST" };
}

export type PutRoute = Route & { method: "PUT" };

export function put(path: string, action: Action): PutRoute {
  return { path, action, method: "PUT" };
}
