import type { Route } from "./route.js";

export interface TrieNode {
  children: TrieNode[];
  path: string;
  isParam: boolean;
  route?: Route;

  add(child: TrieNode): TrieNode;
  find(query: string): TrieNode | undefined;
  findParam(): TrieNode | undefined;
}

export class EmptyTrieNode implements TrieNode {
  children: TrieNode[] = [];
  path: string;
  isParam = false;

  constructor(path: string) {
    this.path = path;
  }

  add(child: TrieNode): TrieNode {
    this.children.push(child);
    return child;
  }

  find(query: string): TrieNode | undefined {
    return this.children.find((child) => child.path === query);
  }

  findParam(): TrieNode | undefined {
    return this.children.find((child) => child.isParam);
  }
}

export class RouteTrieNode implements TrieNode {
  children: TrieNode[] = [];
  path: string;
  isParam = false;
  route: Route;

  constructor(route: Route) {
    this.route = route;
    this.path = route.path.split('/').pop() || '';
    this.isParam = this.path.startsWith(':');
  }

  add(child: TrieNode): TrieNode {
    this.children.push(child);
    return child;
  }

  find(query: string): TrieNode | undefined {
    return this.children.find((child) => child.path === query);
  }

  findParam(): TrieNode | undefined {
    return this.children.find((child) => child.isParam);
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new EmptyTrieNode('');
  }

  insert(route: Route): void {
    const parts = route.path.split('/').filter(Boolean);
    let node = this.root;

    for (const part of parts) {
      const existing = node.find(part);
      if (existing) {
        node = existing;
      } else {
        const newNode = new EmptyTrieNode(part);
        node = node.add(newNode);
      }
    }

    node.route = route;
  }

  search(path: string): Route | undefined {
    const parts = path.split('/').filter(Boolean);
    let node = this.root;

    for (const part of parts) {
      const nextNode = node.find(part) || node.findParam();
      if (!nextNode) return undefined;
      node = nextNode;
    }

    return node.route;
  }
}
