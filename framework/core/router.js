import { render } from "./dom.js";

class Router {
  constructor() {
    this.routes = [];
    this.currentParams = {};
    this.currentQuery = {};
    this.history = [];
    this.currentIndex = -1;
    this.initialized = false;
    this.ownDomain = window.location.origin;

    window.addEventListener("popstate", this._onPopState.bind(this));
    
  }

  
  register(path, handler) {
    if (!this.initialized) {
      this.initialized = true;
    }
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
    console.log("rendering...", match);
    render(match.path, match.handler);
  }

  pushOnly(path) {
    const [pathname, queryStr] = path.split("?");
    const query = this._parseQuery(queryStr || "");


    const state = { path, id: Date.now() };
    history.pushState(state, "", path);
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(state);
    this.currentIndex++;
  }

  _onPopState(event) {
    const state = event.state;
    if (!state) return;

    const [pathname, queryStr] = state.path.split("?");
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(pathname);

    const index = this.history.findIndex((s) => s.id === state.id);
    this.currentIndex = index;
    console.log("match",match);

    if (match) render(match.path, match.handler);
    else console.warn(`Route not found: ${pathname}`);
  }

  _matchRoute(pathname) {
    for (const route of this.routes) {
      const match = pathname.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        this.currentParams = params;
        return { ...route, params };
      }
    }
    return null;
  }

  _parseQuery(queryStr) {
    this.currentQuery = Object.fromEntries(new URLSearchParams(queryStr).entries());
    return this.currentQuery;
}


  start() {
    const path = window.location.pathname;
    const queryStr = window.location.search;
    console.log("pathname in start",path);
    console.log("queryStr",queryStr);
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(path);

    const state = { path, queryStr, id: Date.now() };
    history.replaceState(state, "", path + queryStr);
    this.history.push(state);
    this.currentIndex = 0;

    if (match){
      console.log(match);
    console.log("rendering...", match);

      render(match.path, match.handler, {});
      console.log("match Handler",match.handler);
    }else {
      console.log()
      console.log("no match");
    }
  }

  
  useParams() {
    return this.currentParams || {};
  }

  useQuery() {
    return this.currentQuery || {};
  }
}

const router = new Router();
export default router ;