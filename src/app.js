import { render } from "../core/chaos.js";
import { addRoutes, routes } from "../core/router.js";

export default function App() {
  const path = document.location.pathname;
  addRoutes({
    "/": HomePage,
    "/about": AboutPage,
    "*": NotFound,
  });
  const func = routes[path];
  if (func === undefined) {
    return NotFound();
  }
  return func();
}

render(App);
