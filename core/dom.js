
import { componentIndexes, componentStates } from "./state.js";
import { diff } from "./diff.js";

export let currentComponent = null;

const root = document.getElementById("root");


function createElement(tag, props, ...children) {
    
    const processedChildren = children.flat().map(child => {
        if (typeof child === "string" || typeof child === "number") {
            return {
                type: "text",
                value: child
            };
        }
        return child;
    });

    return {
        tag,
        props: props || {},
        children: processedChildren
    };
}


function c(node) {
    if (!node) return null;
    
    
    if (typeof node === 'function') {
        return c(node());
    }
    
    if (node.type === "text") {
        const textNode = document.createTextNode(String(node.value));
        node["ref"] = textNode;
        return textNode;
    }

    const element = document.createElement(node.tag);

    Object.entries(node.props).forEach(([name, val]) => {
        if (name.startsWith("on") && typeof val === "function") {
            element[name.toLowerCase()] = val;
        } else if (name === "className") {
            element.className = val;
        } else {
            element.setAttribute(name, val);
        }
    });

    node.children.forEach(child => {
        if (typeof child === "function") {
            const childNode = child();
            element.appendChild(c(childNode));
        } else {
            element.appendChild(c(child));
        }
    });

    node["ref"] = element;
    return element;
}


function render(componentFn, props) {
    currentComponent = componentFn;

    
    if (!componentStates.has(componentFn)) {
        componentStates.set(componentFn, { states: [], vdom: null });
    }
    componentIndexes.set(componentFn, 0); 

    const vdom = componentFn(props);
    const componentState = componentStates.get(componentFn);
    
    
    if (!componentState.vdom) {
        root.innerHTML = "";
        const domNode = c(vdom);
        root.appendChild(domNode);
        componentState.vdom = vdom;
    } else {
        
        diff(componentState.vdom, vdom);
        componentState.vdom = vdom;
    }
}

function rerender(componentFn) {
    
    const previousComponent = currentComponent;
    
    
    currentComponent = componentFn;
    componentIndexes.set(componentFn, 0);
    
    
    const vdom = componentFn();
    
    
    const componentState = componentStates.get(componentFn);
    const oldVdom = componentState.vdom;
    
    
    
    
    
    if (oldVdom) {
        diff(oldVdom, vdom);
    }
    
    
    
}

export { createElement, render,c, rerender };
