import type { Action } from "./action.js";
import type { Method } from "./route.js";

export class RouteTrieNode {
	path: string;
	method: Method;
	action: Action;

	children: RouteTrieNode[];

	constructor(path: string, method: Method, action: Action) {
		this.children = [];

		this.path = path;
		this.method = method;
		this.action = action;
	}

	addChild(child: RouteTrieNode) {
		this.children.push(child);
	}
}
