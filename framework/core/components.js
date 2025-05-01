import { jsx } from "./dom.js";
import router from "./router.js";
export function Button(props = {}, children = []) {
  return jsx("button", props, children);
}

export function Div(props = {}, children = []) {
  return jsx("div", props, children);
}

export function Ul(props = {}, children = []) {
  return jsx("ul", props, children);
}

export function Li(props = {}, children = []) {
  return jsx("li", props, children);
}

export function H1(props = {}, children = []) {
  return jsx("h1", props, children);
}

export function H2(props = {}, children = []) {
  return jsx("h2", props, children);
}

export function H3(props = {}, children = []) {
  return jsx("h3", props, children);
}

export function H4(props = {}, children = []) {
  return jsx("h4", props, children);
}

export function H5(props = {}, children = []) {
  return jsx("h5", props, children);
}

export function H6(props = {}, children = []) {
  return jsx("h6", props, children);
}

export function Input(props = {}, children = []) {
  return jsx("input", props, children);
}

export function P(props = {}, children = []) {
  return jsx("p", props, children);
}

export function Span(props = {}, children = []) {
  return jsx("span", props, children);
}

export function Link(props = {}, children = []) {
  props["onClick"] = (e) => {
    e.preventDefault();
    router.push(props.href);
  }
  return jsx("a", props, children);
}

export function ErrorBoundary({ fallback, children }) {
  try {
    return children;
  } catch (error) {
    console.error("Error in component:", error);
    return typeof fallback === "function"
      ? fallback(error)
      : jsx("div", { className: "error" }, "Something went wrong");
  }
}
