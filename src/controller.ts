import type { Action } from "./action.js";

export type Controller<T extends Record<string, Action>> = {
	name: string;
	actions: T;
};

export function createController<T extends Record<string, Action>>(
	controller: Controller<T>,
): Controller<T> {
	return controller;
}
