import type { Action } from "./action.js";
import type { Application } from "./application.js";
import type { Method, Route } from "./route.js";
import { RouteTrieNode } from "./trie.js";

export type RequestHandler = (req: Request) => Promise<Response>;

export function createHandler(application: Application): RequestHandler {
	// TODO: check for duplicates

	const routes = application.routes();

	const rootRoute: Route = routes.filter(
		(route) => route.method === "GET" && route.path === "/",
	)[0] || { path: "/", method: "GET", action: () => new Response() };

	const routesTree = new RouteTrieNode(
		rootRoute.path,
		rootRoute.method,
		rootRoute.action,
	);

	for (const route of application.routes()) {
		let split = route.path.split("/");
		let current = routesTree;

		// traverse until we find out place and add it
	}

	return async (req) => {
		const { method }: { method: Method } = req;
		const { pathname: path } = new URL(req.url);

		const availableRoutes = routes[method];

		// TODO: matching logic

		return new Response();
	};
}
