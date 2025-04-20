// vdom.js
import { componentIndexes, componentStates } from "./state.js";
let currentComponent = null;

const root = document.getElementById("root");

// Function to create virtual DOM nodes
function createElement(tag, props, ...children) {
    // Flatten children array and handle text nodes
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

// Function to render the virtual DOM to real DOM
function c(node) {
    if (!node) return null;
    
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

// Function to render a component and manage state
function render(componentFn, props) {
    currentComponent = componentFn;

    // Initialize states and index if this is the first render
    if (!componentStates.has(componentFn)) {
        componentStates.set(componentFn, { states: [], vdom: null });
    }
    componentIndexes.set(componentFn, 0); // reset hook index to 0 every render

    const vdom = componentFn(props);
    const componentState = componentStates.get(componentFn);
    componentState.vdom = vdom;
    
    root.innerHTML = ""; // Clear the previous content
    console.log("vdom", vdom);
    root.appendChild(c(vdom)); // Render new VDOM
}

export { createElement, render, currentComponent };
