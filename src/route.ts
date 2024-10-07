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
