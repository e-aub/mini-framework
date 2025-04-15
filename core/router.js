import { createElement, render } from "./chaos.js";

const Router = (() => {
  const routes = {};
  let currentPath = null;

  const addRoutes = (routesConfig) => {
    Object.assign(routes, routesConfig);
  };

  const navigate = (path) => {
    if (path === currentPath) return;
    window.history.pushState({}, "", path);
    handleLocation();
  };

  const handleLocation = () => {
    const path = window.location.pathname;
    currentPath = path;

    const component =
      routes[path] ||
      routes["*"] ||
      (() => createElement("h1", null, "404 Not Found"));

    render(component);
  };

  const init = () => {
    window.onpopstate = handleLocation;
    handleLocation();
  };

  return { addRoutes, navigate, init };
})();

export const { addRoutes, navigate, init } = Router;
