import type { Route } from "./route.js";

export type Application = {
	routes: () => Route[];
};

export function createApplication(application: Application): Application {
	return application;
}
