import { Div, Input, H1, Ul, Li, Button, Span } from "../core/components.js";
import { useState, UseStore } from "../core/state.js";
import {Watch} from "../core/watch.js"

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  Watch(()=>{
    console.log("todos  has changed", todos)
  }, [todos])

  const startEditing = (index, todoContent) => {
    setEditingId(index);
    setEditContent(todoContent);
  };

  const saveEdit = (index) => {
    if (editContent.trim() === "") return;

    setTimeout(() => {
      setTodos(
        todos.map((todo, i) =>
          i === index ? { ...todo, content: editContent } : todo
        )
      );
      setEditingId(null);
      setEditContent("");
    }, 0);
  };

  const cancelEdit = () => {
    setTimeout(() => {
      setEditingId(null);
      setEditContent("");
    }, 0);
  };

  const addTodo = () => {
    if (content.trim() === "") return;
    if (todos.some((todo) => todo.content === content)) return;
    setTodos([...todos, { content, completed: false }]);
    setContent("");
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return Div({ className: "todo-container" }, [
    H1({ className: "todo-header" }, "todos"),
    Div({ className: "input-container" }, [
      Input({
        type: "text",
        value: content,
        onInput: (e) => setContent(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") addTodo();
        },
        className: "todo-input",
        placeholder: "What needs to be done?",
      }),
      Button(
        {
          onClick: addTodo,
          className: "add-button",
        },
        "+"
      ),
    ]),

    todos.length > 0 &&
      Button(
        {
          onClick: toggleAll,
          className: "toggle-all-button",
        },
        todos.every((todo) => todo.completed) ? "Uncheck All" : "Check All"
      ),

    Ul(
      { className: "todo-list" },
      filteredTodos.map((todo, index) =>
        editingId === index
          ? Li(
              {
                key: `editing-${index}`,
                className: "todo-item editing",
              },
              [
                Input({
                  type: "text",
                  value: editContent,
                  autoFocus: true,
                  onInput: (e) => setEditContent(e.target.value),
                  onKeyDown: (e) => handleEditKeyDown(e, index),
                  onBlur: () => saveEdit(index),
                  className: "edit-input",
                }),
              ]
            )
          : Li(
              {
                key: `todo-${index}`,
                className: `todo-item ${todo.completed ? "completed" : ""}`,
              },
              [
                Button(
                  {
                    onClick: () => toggleTodo(index),
                    className: `check-button ${
                      todo.completed ? "checked" : ""
                    }`,
                  },
                  todo.completed ? "✓" : ""
                ),
                Span(
                  {
                    className: "todo-text",
                    onDblClick: () => startEditing(index, todo.content),
                  },
                  todo.content
                ),
              ]
            )
      )
    ),

    todos.length > 0 &&
      Div({ className: "filter-container" }, [
        Span(
          { className: "items-left" },
          `${todos.filter((todo) => !todo.completed).length} items left`
        ),
        Div({ className: "filters" }, [
          Button(
            {
              onClick: () => setFilter("all"),
              className: `filter-button ${filter === "all" ? "selected" : ""}`,
            },
            "All"
          ),
          Button(
            {
              onClick: () => setFilter("active"),
              className: `filter-button ${
                filter === "active" ? "selected" : ""
              }`,
            },
            "Active"
          ),
          Button(
            {
              onClick: () => setFilter("completed"),
              className: `filter-button ${
                filter === "completed" ? "selected" : ""
              }`,
            },
            "Completed"
          ),
        ]),

        todos.some((todo) => todo.completed) &&
          Button(
            {
              onClick: () => setTodos(todos.filter((todo) => !todo.completed)),
              className: "clear-completed-button",
            },
            "Clear completed"
          ),
      ]),
  ]);
};
