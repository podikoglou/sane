import type { Route } from "./route.js";

export interface TrieNode {
	children: TrieNode[];
	path: string;

	add(child: TrieNode): void;
}

export class EmptyTrieNode implements TrieNode {
	children: TrieNode[] = [];
	path: string;

	constructor(path: string) {
		this.path = path;
	}

	add(child: TrieNode): void {
		this.children.push(child);
	}
}

export class RouteTrieNode implements TrieNode {
	children: TrieNode[] = [];
	value: Route;
	path: string;

	constructor(route: Route) {
		this.value = route;

		// this won't reactively updated
		this.path = this.value.path;
	}

	add(child: TrieNode): void {
		this.children.push(child);
	}
}
