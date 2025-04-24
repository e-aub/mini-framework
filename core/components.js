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
