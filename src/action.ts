export type Action = (req: Request) => Promise<Response> | Response;
