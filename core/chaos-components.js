import { c } from "./chaos.js";

export function Button({
  onClick,
  children,
  className = "",
  disabled = false,
}) {
  return c(
    "button",
    {
      className: `btn ${className}`,
      onClick,
      disabled,
    },
    children
  );
}

export function Card({ title, children, className = "" }) {
  return c(
    "div",
    { className: `card ${className}` },
    title && c("div", { className: "card-header" }, title),
    c("div", { className: "card-body" }, children)
  );
}

export function NavLink({ to, children, className = "" }) {
  return c(
    "a",
    {
      href: to,
      className: `nav-link ${className}`,
      onClick: (e) => {
        e.preventDefault();
        window.navigate(to);
      },
    },
    children
  );
}

export function Div({ children, className = "" }) {
  return c("div", { className: `div ${className}` }, children);
}

export function Span({ children, className = "" }) {
  return c("span", { className: `span ${className}` }, children);
}

export function Input({ children, className = "" }) {
  return c("input", { className: `input ${className}` }, children);
}

export function Label({ children, className = "" }) {
  return c("label", { className: `label ${className}` }, children);
}

export function Select({ children, className = "" }) {
  return c("select", { className: `select ${className}` }, children);
}

export function Option({ children, className = "" }) {
  return c("option", { className: `option ${className}` }, children);
}

export function Textarea({ children, className = "" }) {
  return c("textarea", { className: `textarea ${className}` }, children);
}

export function Form({ children, className = "" }) {
  return c("form", { className: `form ${className}` }, children);
}

export function FormGroup({ children, className = "" }) {
  return c("div", { className: `form-group ${className}` }, children);
}

export function P({ children, className = "" }) {
  return c("p", { className: `p ${className}` }, children);
}

export function H1({ children, className = "" }) {
  return c("h1", { className: `h1 ${className}` }, children);
}

export function H2({ children, className = "" }) {
  return c("h2", { className: `h2 ${className}` }, children);
}

export function H3({ children, className = "" }) {
  return c("h3", { className: `h3 ${className}` }, children);
}

export function H4({ children, className = "" }) {
  return c("h4", { className: `h4 ${className}` }, children);
}

export function H5({ children, className = "" }) {
  return c("h5", { className: `h5 ${className}` }, children);
}

export function H6({ children, className = "" }) {
  return c("h6", { className: `h6 ${className}` }, children);
}

export function Img({ src, alt, className = "" }) {
  return c("img", { src, alt, className: `img ${className}` });
}


export function ErrorBoundary({ fallback, children }) {
  try {
    return children;
  } catch (error) {
    console.error("Error in component:", error);
    return typeof fallback === "function"
      ? fallback(error)
      : c("div", { className: "error" }, "Something went wrong");
  }
}
