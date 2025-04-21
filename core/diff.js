import { c } from "./dom.js";

function diff(oldVdom, newVdom) {
    
    if (!oldVdom || !newVdom) return;

    
    if (oldVdom.type === "text" && newVdom.type === "text") {
        if (oldVdom.value !== newVdom.value) {
            console.log("changed text node", oldVdom.value, newVdom.value);

            oldVdom.ref.textContent = newVdom.value;
            oldVdom.value = newVdom.value;

            console.log("ooooooold", oldVdom);
            console.log("neeeeew", newVdom);
        }
        return;
    }

    
    if (oldVdom.type !== newVdom.type || oldVdom.tag !== newVdom.tag) {
        const newElement = c(newVdom);
        oldVdom.ref.replaceWith(newElement);
        return;
    }

    
    if (detectPropsChanges(oldVdom, newVdom)) {
        const newElement = c(newVdom);
        oldVdom.ref.replaceWith(newElement);
        return;
    }

    
    if (oldVdom.children.length !== newVdom.children.length) {
        const newElement = c(newVdom);
        oldVdom.ref.replaceWith(newElement);
        return;
    }
    
    for (let i = 0; i < oldVdom.children.length; i++) {
        const oldChild = oldVdom.children[i];
        const newChild = newVdom.children[i];
        
        if (typeof newChild === 'function') {
            const newChildVdom = newChild();
            diff(oldChild, newChildVdom);
            newVdom.children[i] = newChildVdom;
        } else {
            diff(oldChild, newChild);
        }
    }
}

function detectPropsChanges(oldVdom, newVdom) {
    const oldProps = oldVdom.props;
    const newProps = newVdom.props;

    
    for (const key in newProps) {
        if (oldProps[key] !== newProps[key]) {
            return true;
        }
    }

    
    for (const key in oldProps) {
        if (!(key in newProps)) {
            return true;
        }
    }

    return false;
}

export { diff };