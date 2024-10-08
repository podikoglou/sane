import type { Application } from "./application.js";

export type RequestHandler = (req: Request) => Promise<Response>;

export function createHandler(application: Application): RequestHandler {
  return async (req) => {
    return new Response();
  };
}
