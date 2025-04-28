// import { Div, Input, H1, Ul, Li, Button, Span } from "../../core/components.js";
// import { useState } from "../../core/state.js";
// import { useRef } from "../../core/useRef.js";
// import {Watch} from "../../core/watch.js"
import {styles} from "./styles.module.js"
export const App = () => {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");
  const todoHeader = useRef("zzzzzzz");
  const inputContainer = useRef("todo-container");
  const todoList = useRef("todo-list");
  const body = useRef("BODY");
  const [darkMode, setDarkMode] = useState(false);

  Watch(()=>{
    if (todoHeader) {
      Object.assign(todoHeader.style, {
        color: darkMode ? styles.darkMode.header.color : styles.header.color
      });
    }
    if (inputContainer) {
      Object.assign(inputContainer.style, {
        backgroundColor: darkMode ? styles.darkMode.container.backgroundColor : styles.container.backgroundColor,
        color: darkMode ? styles.darkMode.container.color : styles.container.color
      });
    }
    if (todoList) {
      Object.assign(todoList.style, {
        backgroundColor: darkMode ? styles.darkMode.container.backgroundColor : styles.container.backgroundColor,
        color: darkMode ? styles.darkMode.container.color : styles.container.color
      });
    }
    if (body) {
      Object.assign(body.style, {
        backgroundColor: darkMode ? styles.darkMode.container.backgroundColor : styles.container.backgroundColor,
        color: darkMode ? styles.darkMode.container.color : styles.container.color
      });
    }
  }, [darkMode])

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
    if (content.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }
    
    if (todos.some((todo) => todo.content.toLowerCase() === content.toLowerCase())) {
      setError("This todo already exists");
      return;
    }

    setTodos([...todos, { content, completed: false }]);
    setContent("");
    setError("");
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setContent(newValue);
    setError("");
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

  return Div({ 
    className: "todo-container", 
    reference: "todo-container",
    style: {
      ...styles.container,
      ...(darkMode ? styles.darkMode.container : {})
    }
  }, [
    Button({
      onClick: () => setDarkMode(!darkMode),
      style: {
        ...styles.themeSwitch,
        ...(darkMode ? styles.themeSwitchDark : styles.themeSwitchLight)
      }
    }, [
      Span({}, darkMode ? "🌞" : "🌙"),
      Span({}, darkMode ? "Light Mode" : "Dark Mode")
    ]),
    
    H1({ 
      className: "todo-header", 
      reference: "zzzzzzz",
      style: {
        ...styles.header,
        ...(darkMode ? styles.darkMode.header : {})
      }
    }, "todos"),
    
    Div({ 
      className: "input-container",
      style: styles.inputContainer 
    }, [
      Input({
        type: "text",
        value: content,
        onInput: handleInputChange,
        onKeyDown: (e) => {
          if (e.key === "Enter") addTodo();
        },
        className: "todo-input",
        placeholder: "What needs to be done?",
        style: {
          ...styles.input,
          ...(darkMode ? styles.darkMode.input : {}),
          ...(error ? (darkMode ? styles.darkMode.inputError : styles.inputError) : {})
        }
      }),
      Button(
        {
          onClick: addTodo,
          className: "add-button",
          style: {
            ...styles.addButton,
            ...(darkMode ? styles.darkMode.addButton : {})
          }
        },
        "+"
      ),
    ]),

    error && Span({
      style: {
        ...styles.errorMessage,
        ...(darkMode ? styles.darkMode.errorMessage : {})
      }
    }, error),

    todos.length > 0 &&
      Button(
        {
          onClick: toggleAll,
          className: "toggle-all-button",
          style: {
            ...styles.toggleAllButton,
            ...(darkMode ? styles.darkMode.toggleAllButton : {})
          }
        },
        todos.every((todo) => todo.completed) ? "Uncheck All" : "Check All"
      ),

    Ul(
      { 
        className: "todo-list", 
        reference: "todo-list",
        style: styles.todoList 
      },
      filteredTodos.map((todo, index) =>
        editingId === index
          ? Li(
              {
                key: `todo-${todo.content}`,
                className: "todo-item editing",
                style: {
                  ...styles.todoItem,
                  ...(darkMode ? styles.darkMode.todoItem : {})
                }
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
                  style: {
                    ...styles.input,
                    ...(darkMode ? styles.darkMode.input : {})
                  }
                }),
              ]
            )
          : Li(
              {
                key: `todo-${todo.content}`,
                className: `todo-item ${todo.completed ? "completed" : ""}`,
                style: {
                  ...styles.todoItem,
                  ...(darkMode ? styles.darkMode.todoItem : {})
                }
              },
              [
                Button(
                  {
                    onClick: () => toggleTodo(index),
                    className: `check-button ${todo.completed ? "checked" : ""}`,
                    style: {
                      ...styles.checkButton,
                      ...(darkMode ? styles.darkMode.checkButton : {})
                    }
                  },
                  todo.completed ? "✓" : ""
                ),
                Span(
                  {
                    className: "todo-text",
                    onDblClick: () => startEditing(index, todo.content),
                    style: {
                      ...styles.todoText,
                      ...(darkMode ? styles.darkMode.todoText : {}),
                      ...(todo.completed ? (darkMode ? styles.darkMode.completed : styles.completed) : {})
                    }
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
