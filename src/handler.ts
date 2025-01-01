import type { Application } from "./application.js";
import { type Method, } from "./route.js";
import { EmptyTrieNode, RouteTrieNode } from "./trie.js";

export type RequestHandler = (req: Request) => Promise<Response>;

export function createHandler(application: Application): RequestHandler {
  // TODO: check for duplicates
  const routes = application.routes();

  const trieRoot = new EmptyTrieNode("/");

  for (const route of application.routes()) {
    let current = trieRoot;

    // split url into segments
    const segments = route.path.split("/");
    segments.pop(); // ignore the last one

    for (const segment of segments) {
      // if the node already exists, don't create it
      if (current.find(segment)) {
        current = current.find(segment)!;
      } else {
        current = current.add(new EmptyTrieNode(segment));
      }

      console.log({ path: current });
    }

    current.add(new RouteTrieNode(route));
  }

  return async (req) => {
    const method: Method = req.method;
    const { pathname: path } = new URL(req.url);

    const availableRoutes = routes[method];

    // TODO: matching logic

    return new Response();
  };
}
