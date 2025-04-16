import { addRoutes } from "../core/router.js";
import { HomePage, AboutPage } from "./app.js";

addRoutes({
  "/": HomePage,
  "/about": AboutPage,
});

