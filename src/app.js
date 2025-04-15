import { render, c, useState } from "../core/chaos.js";

export default function App() {
  const [counter, setCounter] = useState(0);
  const plusCount = () => {
    setCounter(counter + 1);
  };
  return c(
    "div",
    null,
    c("h1", null, counter),
    c(
      "button",
      {
        className: "cur",
        onClick: () => {
          plusCount();
        },
      },
      "click"
    )
  );
}

render(App);
