class Router {
    currentPath = $state(window.location.pathname);

    constructor() {
        window.addEventListener("popstate", () => {
            this.currentPath = window.location.pathname;
        });
    }

    goto(path) {
        window.history.pushState({}, "", path);
        this.currentPath = path;
    }
}

export const router = new Router();