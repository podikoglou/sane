import type { Route } from "./route.js";
import { Trie } from "./trie.js";
import type { Request, Response } from "./handler.js";

export type Application = {
  routes: Route[];
  trie: Trie;
  handle: (req: Request) => Promise<Response>;
};

export function createApplication(config: { routes: () => Route[] }): Application {
  const routes = config.routes();
  const trie = new Trie();
  
  // Insert all routes into the trie
  routes.forEach(route => trie.insert(route));

  async function handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const route = trie.search(url.pathname);

    if (!route) {
      return new Response('Not Found', { status: 404 });
    }

    if (route.method !== req.method) {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      return await route.action(req);
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return {
    routes: () => routes,
    trie,
    handle
  };
}
