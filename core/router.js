import { render, c } from "./chaos.js";
const Router = (() => {
  const routes = {};
  let currentPath = null;
  let initialized = false;

  const addRoutes = (routesConfig) => {
    Object.assign(routes, routesConfig);
    if (!initialized) {
      initializeRouter();
    }
  };

  const navigate = (path) => {
    if (path === currentPath) return;
    window.history.pushState({}, "", path);
    handleLocation();
  };

  const handleLocation = () => {
    const path = window.location.pathname;
    currentPath = path;
    const component = routes[path] || routes["*"];

    if (component) {
      render(component);
    } else {
      console.error(`No route found for path: ${path}`);
    }
  };

  const initializeRouter = () => {
    if (initialized) return;
    window.onpopstate = handleLocation;
    window.navigate = navigate;
    handleLocation();
    initialized = true;
  };

  return { addRoutes, navigate, routes };
})();

export const { addRoutes, navigate, routes } = Router;
