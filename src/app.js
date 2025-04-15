import { c, render } from "../core/chaos.js";
import { addRoutes, navigate } from "../core/router.js";

export default function App() {
  addRoutes({
    "/": HomePage,
    "/about": AboutPage,
    "*": NotFound,
  });

  return HomePage();
}

function HomePage() {
  return c(
    "div",
    null,
    c("h1", null, "Home Page"),
    c(
      "button",
      {
        onClick: () => navigate("/about"),
      },
      "Go to About"
    )
  );
}

function AboutPage() {
  return c(
    "div",
    null,
    c("h1", null, "About Us"),
    c(
      "button",
      {
        onClick: () => navigate("/"),
      },
      "Go Home"
    )
  );
}

function NotFound() {
  return c("h1", null, "404 - Page Not Found fff");
}

render(App);
