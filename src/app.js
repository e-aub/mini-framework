import { c, useState } from "../core/chaos.js";

export default function App() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(content, todos);
  
  return c("div", { className: "app" }, [
    c("h1", null, "Todo App"),
    c(
      "input",
      {
        onChange: (e) => {
          setContent(e.target.value);
        },
        placeholder: "Add a todo",
      }
    ),
    c(
      "button",
      {
        onClick: () => {
          setTodos((prev) => [...prev, content]);
          setContent("");
        },
      },
      "submit"
    ),
    todos.length > 0
      ? c("ul", null, [todos.map((todo) => c("li", null, todo))])
      : c("p", null, "No todos yet"),
  ]);
}
