import { render } from "./dom.js";

class Router {
  constructor() {
    this.routes = [];
    this.currentParams = {};
    this.currentQuery = {};
    this.history = [];
    this.currentIndex = -1;

    window.addEventListener("popstate", this._onPopState.bind(this));
    this.start();
  }

  // Register route like "/user/:id"
  register(path, handler) {
    const paramNames = [];
    const regex = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return "([^/]+)";
    });

    this.routes.push({
      path,
      regex: new RegExp(`^${regex}$`),
      handler,
      paramNames,
    });
  }

  // Push a new route like React Router
  push(path) {
    const [pathname, queryStr] = path.split("?");
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(pathname);

    if (!match) {
      console.warn(`Route not found: ${pathname}`);
      return;
    }

    const state = { path, id: Date.now() };
    history.pushState(state, "", path);
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(state);
    this.currentIndex++;

    this._render(match, query);
  }

  _onPopState(event) {
    const state = event.state;
    if (!state) return;

    const [pathname, queryStr] = state.path.split("?");
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(pathname);

    const index = this.history.findIndex((s) => s.id === state.id);
    this.currentIndex = index;

    if (match) this._render(match, query);
  }

  _matchRoute(pathname) {
    for (const route of this.routes) {
      const match = pathname.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        return { ...route, params };
      }
    }
    return null;
  }

  _parseQuery(queryStr) {
    const params = {};
    new URLSearchParams(queryStr).forEach((v, k) => {
      params[k] = v;
    });
    return params;
  }

  _render(match, query) {
    this.currentParams = match.params;
    this.currentQuery = query;
    render(match.path, match.handler);
  }

  start() {
    const path = window.location.pathname + window.location.search;
    const [pathname, queryStr] = path.split("?");
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(pathname);

    const state = { path, id: Date.now() };
    history.replaceState(state, "", path);
    this.history.push(state);
    this.currentIndex = 0;

    if (match) this._render(match, query);
  }

  // Hook-like accessors
  useParams() {
    return { ...this.currentParams };
  }

  useQuery() {
    return { ...this.currentQuery };
  }
}

const router = new Router();
export default router ;