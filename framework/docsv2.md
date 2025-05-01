# MostJS Documentation

## Introduction

MostJS is a lightweight frontend framework that puts you in control of your code without imposing restrictive patterns. It provides a simple yet powerful approach to building web applications, allowing you to use the framework while maintaining the freedom to incorporate JavaScript code you prefer.

## Table of Contents

1. [Getting Started](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#getting-started)
2. [Core Concepts](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#core-concepts)
   * [Creating Elements](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#creating-elements)
   * [Creation Components](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#creation-components)
   * [Components](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#components)
   * [State Management](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#state-management)
   * [Handling References](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#handling-references)
   * [Watching for Changes](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#watching-for-changes)
   * [Routing](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#routing)
3. [API Reference](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#api-reference)
4. [Examples](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#examples)
5. [Best Practices](https://claude.ai/chat/346f8102-ef84-483e-96af-a12cf0b979d6#best-practices)

## Getting Started

### Installation

```bash
# Using npm
npm i @hacker_man/most-js
```

### if you want to use it in browser you can use cdn

```
import { anything } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.0.7/index.js'
```

### Basic Usage

```js
import { Div, H1, P, Button, useState, render } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.0.7/index.js';

const App = () => {
  const [count, setCount] = useState(0);
  
  return Div({ className: 'app' }, [
    H1({}, ["Hello, MostJS!"]),
    P({}, [`Current count: ${count}`]),
    Button({ 
      onClick: () => setCount(count + 1) 
    }, ["Increment"])
  ]);
}

// Render your app to the DOM
render(App, document.getElementById('root'));
```

## Core Concepts

### Creating Elements

In MostJS, you create DOM elements using the `jsx` function:

```js
jsx(tag, props, ...children)
```

**Parameters:**

* `tag`: The HTML tag name or component function
* `props`: An object containing attributes, event handlers, and other properties
* `children`: An array of children: other elements, text content, or components

**Example:**

```js
const element = jsx('div', { 
  className: 'container',
  id: 'main',
  onClick: () => console.log('Clicked!')
}, [
  jsx('h1', {}, ["Title"]),
  jsx('p', {}, ["Content"])
]);
```

### Creation Components

MostJS provides creation-components which are predefined functions that use the `jsx` function internally, making your code cleaner and more readable.

**Example:**

```js
import { Div, P } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.0.7/index.js';

return Div({ className: 'container' }, [
  P({ id: "greeting" }, ["Hello world"])
]);
```

#### Available Creation Components

MostJS includes the following creation-components:

```js
// Button component
Button(props = {}, children = [])

// Div component
Div(props = {}, children = []) 
// Ul component
Ul(props = {}, children = []) 
// Li component
Li(props = {}, children = []) 
// Link component
Link(props = {}, children = []) 
// H1 component
H1(props = {}, children = []) 
// H2 component
H2(props = {}, children = []) 
// H3 component
H3(props = {}, children = []) 
// H4 component
H4(props = {}, children = []) 
// H5 component
H5(props = {}, children = []) 
// H6 component
H6(props = {}, children = []) 
// Input component
Input(props = {}, children = []) 
// P component
P(props = {}, children = []) 
// Span component
Span(props = {}, children = []) ```

### Components

Components in MostJS are functions that return a JSX expression or use creation-components. They form the building blocks of your application's UI.

**Component Definition:**

```js
import { Div, P, Button, useState } from 'most-js';

const Counter = (props) => {
  const [count, setCount] = useState(props.initialCount || 0);
  
  return Div({ className: 'counter' }, [
    P({}, [`Count: ${count}`]),
    Button({ 
      onClick: () => setCount(count + 1) 
    }, ["Increment"])
  ]);
};
```

**Usage:**

```js
import { Div } from 'most-js';

const App = () => {
  return Div({ className: 'app' }, [
    Counter({ initialCount: 5 }),
    Counter({ initialCount: 10 })
  ]);
};
```

### State Management

MostJS provides a simple state management system with the `useState` hook.

#### useState

The `useState` hook allows components to manage their state. It can only be used inside component functions.

```js
const [state, setState] = useState(initialValue);
```

**Parameters:**

* `initialValue`: Can be a direct value or a function that returns a value

**Returns:**

* `state`: The current state value
* `setState`: A function to update the state

**Example:**

```js
import { Div, Input, Button, Ul, Li, useState } from 'most-js';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };
  
  return Div({ className: 'todo-app' }, [
    Input({ 
      value: newTodo,
      onInput: (e) => setNewTodo(e.target.value)
    }, []),
    Button({ onClick: addTodo }, ["Add"]),
    Ul({}, 
      todos.map(todo => 
        Li({ key: todo.id }, [todo.text])
      )
    )
  ]);
};
```

### Handling References

#### useRef

The `useRef` hook provides a way to access and manipulate the actual DOM elements.

```js
const elementRef = useRef(referenceId);
```

**Parameters:**

* `referenceId`: A unique identifier string, that reference id is a unique id that you give it in props to element with a key of reference the rendering system when finds refernce in props of an element it assumes that it needs to be stored and accseccibble with the use ref function;

**Returns:**

* A reference to the actual DOM element

**Example:**

```js
import { Div, Input, Button, useRef } from 'most-js';

const InputFocus = () => {
  const inputRef = useRef("input-field");
  
  const focusInput = () => {
    inputRef.focus();
  };
  
  return Div({}, [
    Input({ 
      reference: "input-field",
      type: "text" 
    }, []),
    Button({ 
      onClick: focusInput 
    }, ["Focus Input"])
  ]);
};
```

### Watching for Changes

#### Watch

The `Watch` function allows you to execute side effects when dependencies change.

```js
Watch(callback, dependencies);
```

**Parameters:**

* `callback`: Function to execute when dependencies change
* `dependencies`: Array of values to watch for changes (optional)

**Behavior:**

* If no dependency array is provided: runs only on mount
* If an empty array is provided (`[]`): runs on every re-render
* With dependencies: runs when any dependency changes (using deep equality)

**Example:**

```js
import { Div, H1, Button, useRef, useState, Watch } from 'most-js';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef("container");
  const headerRef = useRef("header");
  
  Watch(() => {
    containerRef.style.backgroundColor = isDark ? '#222' : '#fff';
    containerRef.style.color = isDark ? '#fff' : '#222';
    headerRef.style.color = isDark ? '#fff' : '#222';
  }, [isDark]);
  
  return Div({ 
    className: "container", 
    reference: "container" 
  }, [
    H1({ 
      reference: "header" 
    }, ["Theme Example"]),
    Button({ 
      onClick: () => setIsDark(!isDark) 
    }, [`Switch to ${isDark ? 'light' : 'dark'} mode`])
  ]);
};
```

### Routing

MostJS provides a simple routing solution for single-page applications. The routing system allows you to create a single-page application with multiple views.

if you used router now need to do render to any component the router will map the router to its component and render


## API Reference

### Core Functions

| Function                          | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `jsx(tag, props, ...children)`  | Creates virtual DOM elements                      |
| `useState(initialValue)`        | Creates a state variable and its setter           |
| `useRef(referenceId)`           | Accesses DOM elements directly                    |
| `Watch(callback, dependencies)` | Executes code when dependencies change            |
| `render(component, domElement)` | Renders a component to the DOM                    |
| `Router({}, [routes])`          | Container for route definitions                   |
| `Route({ path, component })`    | Defines a route with path and component to render |

### Creation Components

| Component                   | HTML Equivalent |
| --------------------------- | --------------- |
| `Button(props, children)` | `<button>`    |
| `Div(props, children)`    | `<div>`       |
| `Ul(props, children)`     | `<ul>`        |
| `Li(props, children)`     | `<li>`        |
| `Link(props, children)`   | `<a>`         |
| `H1(props, children)`     | `<h1>`        |
| `H2(props, children)`     | `<h2>`        |
| `H3(props, children)`     | `<h3>`        |
| `H4(props, children)`     | `<h4>`        |
| `H5(props, children)`     | `<h5>`        |
| `H6(props, children)`     | `<h6>`        |
| `Input(props, children)`  | `<input>`     |
| `P(props, children)`      | `<p>`         |
| `Span(props, children)`   | `<span>`      |

## Examples

### Counter Application

```js
import { Div, H2, P, Button, useState, render } from 'most-js';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return Div({ className: 'counter' }, [
    H2({}, ["Counter"]),
    P({}, [`Current count: ${count}`]),
    Button({ 
      onClick: () => setCount(count - 1) 
    }, ["Decrement"]),
    Button({ 
      onClick: () => setCount(count + 1) 
    }, ["Increment"])
  ]);
};

render(Counter, document.getElementById('root'));
```

### Theme Switcher with useRef and Watch

```js
import { Div, H1, P, Button, useRef, useState, Watch, render } from 'most-js';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');
  const appRef = useRef('app-container');
  const headingRef = useRef('main-heading');
  
  // Theme configurations
  const themes = {
    light: {
      background: '#ffffff',
      text: '#333333',
      heading: '#000000'
    },
    dark: {
      background: '#222222',
      text: '#eeeeee',
      heading: '#ffffff'
    },
    blue: {
      background: '#1a2b3c',
      text: '#f0f0f0',
      heading: '#89cff0'
    }
  };
  
  // Apply theme whenever it changes
  Watch(() => {
    const currentTheme = themes[theme];
    appRef.style.backgroundColor = currentTheme.background;
    appRef.style.color = currentTheme.text;
    headingRef.style.color = currentTheme.heading;
  }, [theme]);
  
  return Div({ 
    className: 'theme-switcher',
    reference: 'app-container'
  }, [
    H1({ reference: 'main-heading' }, ["Theme Demonstration"]),
    P({}, ["Select a theme to see it in action:"]),
    Div({ className: 'theme-buttons' }, [
      Button({ 
        onClick: () => setTheme('light'),
        className: theme === 'light' ? 'active' : ''
      }, ["Light"]),
      Button({ 
        onClick: () => setTheme('dark'),
        className: theme === 'dark' ? 'active' : ''
      }, ["Dark"]),
      Button({ 
        onClick: () => setTheme('blue'),
        className: theme === 'blue' ? 'active' : ''
      }, ["Blue"])
    ]),
    P({}, [`Current theme: ${theme}`])
  ]);
};

render(ThemeSwitcher, document.getElementById('root'));
```

### Todo List

```js
import { Div, H1, Input, Button, Ul, Li, Span, useState, render } from 'most-js';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return Div({ className: 'todo-app' }, [
    H1({}, ["Todo List"]),
    Div({ className: 'add-todo' }, [
      Input({ 
        value: newTodo,
        onInput: (e) => setNewTodo(e.target.value),
        onKeyPress: (e) => e.key === 'Enter' && addTodo()
      }, []),
      Button({ onClick: addTodo }, ["Add"])
    ]),
    Ul({ className: 'todo-list' }, 
      todos.map(todo => 
        Li({ 
          key: todo.id,
          className: todo.completed ? 'completed' : '',
          onClick: () => toggleTodo(todo.id)
        }, [
          Span({}, [todo.text]),
          Button({ 
            onClick: (e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            } 
          }, ["Delete"])
        ])
      )
    )
  ]);
};

render(TodoApp, document.getElementById('root'));
```

## Best Practices

1. **Component Organization**
   * Keep components focused on a single responsibility
   * Place related state in the most appropriate component
   * Create reusable components for UI elements that appear in multiple places
2. **Performance Optimization**
   * Use `Watch` with specific dependencies to minimize unnecessary re-renders
   * Avoid deep nesting of components when possible
   * Use the creation-components for better readability and consistency
   * Implement memoization for expensive operations
3. **State Management**
   * Keep state as local as possible
   * Use props to pass data down to child components
   * Consider state lifting for shared state between siblings
   * Use composition to avoid prop drilling through many component layers
4. **References**
   * Use references only when direct DOM manipulation is necessary
   * Give meaningful, unique IDs to references
   * Clean up event listeners and subscriptions when components unmount
5. **Virtual DOM Usage**
   * Understand that MostJS uses a virtual DOM to optimize real DOM updates
   * Each state change triggers a re-render of the component and its children
   * Group related state updates together to avoid multiple re-renders
6. **Code Organization**
   * Split your application into logical modules
   * Keep related files together
   * Use consistent naming conventions for components, files, and functions
7. **Error Handling**
   * Implement error boundaries for graceful failure handling
   * Provide meaningful error messages and fallback UI
   * Use try/catch blocks for operations that might fail

## Under the Hood

MostJS uses a virtual DOM approach to efficiently update the real DOM. When state changes occur:

1. A new virtual DOM tree is generated
2. It's compared with the previous virtual DOM using a diffing algorithm
3. Only the necessary changes are applied to the real DOM

This approach minimizes expensive DOM operations while maintaining a simple mental model for developers.

### Deep Equality Checking

MostJS implements deep equality checking for state changes and dependency tracking. This means:

* When `setState` is called, MostJS compares the new value with the old one using deep equality
* Only if the values are not deeply equal will a re-render be triggered
* This prevents unnecessary re-renders when reference changes don't affect the actual data

### Component Lifecycle

Although not explicitly exposed as lifecycle methods, MostJS components follow a predictable lifecycle:

1. **Initialization** : Component function is called, states are initialized
2. **Mounting** : Virtual DOM is created and rendered to the real DOM
3. **Updating** : Component re-renders when state changes or Watch dependencies update
4. **Unmounting** : Component is removed from the DOM, resources can be cleaned up

### Diffing Algorithm

The diffing algorithm follows these priorities to minimize DOM operations:

1. Compare node types
2. Compare element attributes and event listeners
3. Compare child nodes recursively
4. Apply the minimum set of changes to transform the old DOM into the new one

## Advanced Topics

### Custom Creation Components

You can create your own creation components for frequently used elements:

```js
import { jsx } from 'most-js';

export function Card(props = {}, children = []) {
  const cardProps = {
    ...props,
    className: `card ${props.className || ''}`
  };
  return jsx('div', cardProps, children);
}

// Usage
import { Card, H3, P } from 'most-js';

const ProductCard = (props) => {
  return Card({ className: 'product-card' }, [
    H3({}, [props.title]),
    P({}, [props.description])
  ]);
};
```

### Component Composition

MostJS encourages composition to build complex UIs from simple components:

```js
import { Div, useState } from 'most-js';

// Base components
const Header = (props) => {
  return Div({ className: 'header' }, props.children);
};

const Content = (props) => {
  return Div({ className: 'content' }, props.children);
};

const Footer = (props) => {
  return Div({ className: 'footer' }, props.children);
};

// Composed application
const App = () => {
  const [user, setUser] = useState({ name: 'Guest' });
  
  return Div({ className: 'app' }, [
    Header({}, [
      `Welcome, ${user.name}`
    ]),
    Content({}, [
      "Main content goes here"
    ]),
    Footer({}, [
      "© 2025 MostJS"
    ])
  ]);
};
```


