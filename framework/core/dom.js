import { componentIndexes, componentStates } from "./state.js";
import { diff } from "./diff.js";
import { applyCallbacksAfterRender } from "./watch.js";
import { refs } from "./useRef.js";

export let currentComponent = null;



const root = document.getElementById("root");

function jsx(tag, props, ...children) {
  const processedChildren = children.flat().map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return {
        type: "text",
        value: child,
        ref : null
      };
    }
    return child;
  });

  return {
    tag,
    props: props || {},
    children: processedChildren,
    ref : null
  };
}

function createElement(node) {
  if (typeof node == "boolean" || node === null || node === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof node === "function") {
    return createElement(node());
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
    } else if (name === "reference") {
      element.setAttribute("reference", val);
      refs.set(val, element);
    } else if (name === "style" && typeof val === "object") {
      Object.assign(element.style, val);
    } else {
      element.setAttribute(name, val);
    }
  });

  children.forEach((child) => {
    if (typeof child === "function") {
      const childNode = child();
      element.appendChild(createElement(childNode));
    } else {
      element.appendChild(createElement(child));
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
    const domNode = createElement(vdom);
    root.appendChild(domNode);
    componentState.vdom = vdom;
  } else {
    diff(componentState.vdom, vdom);
  }
  applyCallbacksAfterRender();
}

function rerender(componentFn) {
  currentComponent = componentFn;
  componentIndexes.set(componentFn, 0);

  const vdom = componentFn();

  const componentState = componentStates.get(componentFn);
  const oldVdom = componentState.vdom;

  diff(oldVdom, vdom);
  applyCallbacksAfterRender();
}

export { jsx, render, createElement, rerender };
