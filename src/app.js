import { c } from "../core/chaos.js";
import { navigate } from "../core/router.js";

export function HomePage() {
  return c(
    "div",
    null,
    c("h1", null, "Home Page"),
    c(
      "button",
      {
        onClick: () => {
          navigate("/about");
        },
      },
      "about"
    ),
    "hello world"
  );
}

export function AboutPage() {
  return c(
    "div",
    null,
    c("h1", null, "About Page"),
    c(
      "button",
      {
        onClick: () => {
          navigate("/");
        },
      },
      "home"
    )
  );
}
