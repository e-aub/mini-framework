// Routing Module
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
    }

    // Add route
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    // Handle route change
    handleRoute(path) {
        const handler = this.routes.get(path);
        if (handler) {
            handler();
            this.currentRoute = path;
        }
    }

    // Initialize router
    init() {
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }
}

export default Router; 