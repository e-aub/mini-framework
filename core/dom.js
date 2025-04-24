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

export function Button(props = {}, children = []) {
    return createElement("button", props, children);
  }
  
  export function Div(props = {}, children = []) {
      return createElement("div", props, children);
  }
  
  export function Ul(props = {}, children = []) {
      return createElement("ul", props, children);
  }
  
  export function Li(props = {}, children = []) {
      return createElement("li", props, children);
  }
  
  export function Link(props = {}, children = []) {
    return createElement("a", props, children);
  }
  
  export function H1(props = {}, children = []) {
      return createElement("h1", props, children);
  }
  
  export function H2(props = {}, children = []) {
      return createElement("h2", props, children);
  }
  
  export function H3(props = {}, children = []) {
      return createElement("h3", props, children);
  }
  
  export function H4(props = {}, children = []) {
      return createElement("h4", props, children);
  }
  
  export function H5(props = {}, children = []) {
      return createElement("h5", props, children);
  }
  
  export function H6(props = {}, children = []) {
      return createElement("h6", props, children);
  }
  
  export function Input(props = {}, children = []) {
      return createElement("input", props, children);
  }
  
  export function P(props = {}, children = []) {
      return createElement("p", props, children);
  }
  
  export function ErrorBoundary({ fallback, children }) {
    try {
      return children;
    } catch (error) {
      console.error("Error in component:", error);
      return typeof fallback === "function"
        ? fallback(error)
        : createElement("div", { className: "error" }, "Something went wrong");
    }
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

    const props = node.props || {};
    const children = node.children || [];

    Object.entries(props).forEach(([name, val]) => {
        if (name.startsWith("on") && typeof val === "function") {
            element[name.toLowerCase()] = val;
        } else if (name === "className") {
            element.className = val;
        } else {
            element.setAttribute(name, val);
        }
    });
    
    children.forEach(child => {
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
    }
}

function rerender(componentFn) {
    currentComponent = componentFn;
    componentIndexes.set(componentFn, 0);
    
    const vdom = componentFn();
    
    const componentState = componentStates.get(componentFn);
    const oldVdom = componentState.vdom;
    
    diff(oldVdom, vdom);
}

export { createElement, render,c, rerender };
