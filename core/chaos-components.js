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
