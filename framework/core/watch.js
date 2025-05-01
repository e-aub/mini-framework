import componentStack from "./componentStack.js";

let oldDependencies = new Map();
let cleanupFunctions = new Map()
let afterRenderEffects = new Map();

export function isPlainObject(obj) {
    return obj !== null && typeof obj === "object" && obj.constructor === Object;
}

export function shallowEqualObjects(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => a[key] === b[key]);
}

export function areDepsEqual(newDeps, oldDeps) {
    if (newDeps.length)
    if (newDeps.length !== oldDeps.length) return false;

    return newDeps.every((dep, i) => {
        const oldDep = oldDeps[i];

        if (Array.isArray(dep) && Array.isArray(oldDep)) {
            if (dep.length !== oldDep.length) return false;
            return dep.every((val, j) => {
                if (Array.isArray(val) && Array.isArray(oldDep[j])) {
                    return areDepsEqual(val, oldDep[j]);
                }else if (isPlainObject(val) && isPlainObject(oldDep[j])) {
                    return shallowEqualObjects(val, oldDep[j]);
                }

                return val === oldDep[j];

            });
        }

        if (isPlainObject(dep) && isPlainObject(oldDep)) {
            return shallowEqualObjects(dep, oldDep);
        }

        return dep === oldDep;
    });
}

export function Watch(callback, deps = null) {
    const currentComponent = componentStack.current;
  console.log("this is current component",currentComponent);


    if (!afterRenderEffects.has(currentComponent)) {
        afterRenderEffects.set(currentComponent, []);
    }

    const effects = afterRenderEffects.get(currentComponent);

    if (!deps) {
        effects.push(() => {
            const cleanup = cleanupFunctions.get(currentComponent);
            if (typeof cleanup === "function") cleanup();

            const result = callback();
            if (typeof result === "function") {
                cleanupFunctions.set(currentComponent, result);
            }
        });
        return;
    }

    if (!Array.isArray(deps)) {
        console.error(
            "%c[Watch Error]%c Expected an array of dependencies.\n" +
            "Wrap dependencies in square brackets like this: %c[dep1, dep2]%c.",
            "color: red; font-weight: bold;",
            "color: white;",
            "color: cyan; font-style: italic;",
            "color: white;"
        );
        return;
    }

    const oldDeps = oldDependencies.get(currentComponent) || [];
    const hasChanged = !areDepsEqual(deps, oldDeps);

    if (hasChanged) {
        oldDependencies.set(currentComponent, [...deps]);

        effects.push(() => {
            const cleanup = cleanupFunctions.get(currentComponent);
            if (typeof cleanup === "function") cleanup();

            const result = callback();
            if (typeof result === "function") {
                cleanupFunctions.set(currentComponent, result);
            }
        });
    }
}


export function applyCallbacksAfterRender() {
    const currentComponent = componentStack.current;
    console.log("this is current component",currentComponent);
    const currentAfterRenderEffects = afterRenderEffects.get(currentComponent);

    afterRenderEffects.set(currentComponent, []);

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
        if (currentAfterRenderEffects) {
            currentAfterRenderEffects.forEach((callback) => {
                try {
                    const result = callback();
                    if (typeof result === "function") {
                        cleanupFunctions.set(currentComponent, result);
                    }
                } catch (error) {
                    console.error("Error in effect:", error);
                }
            });
        }
    });
}