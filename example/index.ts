import { createApplication } from "./application.js";
import home from "./controllers/home.js";
import { get } from "./route.js";

export default createApplication({
	routes: () => {
		return [get("/", home.actions.index)];
	},
});
