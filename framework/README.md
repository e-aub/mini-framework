
# MostJS Framework Documentation

## Introduction

MostJS is a lightweight frontend framework that gives you complete control over your code without imposing restrictive patterns. It provides a simple yet powerful approach to building web applications, allowing you to use the framework's utilities while maintaining the freedom to incorporate your preferred JavaScript techniques.

Unlike larger frameworks that dictate how your application should be structured, MostJS provides essential tools for creating reactive web applications while keeping the core API minimal and approachable.

## Table of Contents

1. [Getting Started](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#getting-started)
   * [Installation](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#installation)
   * [Basic Usage](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#basic-usage)
2. [Core Concepts](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#core-concepts)
   * [Virtual DOM](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#virtual-dom)
   * [Creating Elements](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#creating-elements)
   * [Creation Components](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#creation-components)
   * [Components](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#components)
   * [State Management](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#state-management)
   * [Handling References](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#handling-references)
   * [Watching for Changes](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#watching-for-changes)
   * [Routing](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#routing)
   * [Diffing Algorithm](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#diffing-algorithm)
   * [Rendering](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#rendering)
3. [API Reference](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#api-reference)
   * [Core Functions](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#core-functions)
   * [Creation Components](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#creation-components-1)
   * [Router API](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#router-api)
4. [Examples](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#examples)
   * [Counter Application](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#counter-application)
   * [Theme Switcher with useRef and Watch](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#theme-switcher-with-useref-and-watch)
   * [Todo List Application](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#todo-list-application)
   * [SPA with Routing](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#spa-with-routing)
5. [Under the Hood](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#under-the-hood)
   * [Component Architecture](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#component-architecture)
   * [State Management Implementation](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#state-management-implementation)
   * [Component Lifecycle](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#component-lifecycle)
   * [Diffing Algorithm Details](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#diffing-algorithm-details)
6. [Best Practices](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#best-practices)
   * [Component Organization](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#component-organization)
   * [Performance Optimization](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#performance-optimization)
   * [State Management Patterns](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#state-management-patterns)
   * [Error Handling](https://claude.ai/chat/1f47047c-5c99-4736-863e-f7d3479ec690#error-handling)

## Getting Started

### Installation

You can install MostJS via npm:

```bash
# Using npm
npm i @hacker_man/most-js
```

### Using CDN

For direct use in browsers without a build step:

```js
import { anything } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js'
```

### Basic Usage

Here's a simple example showing how to create a counter application:

```js
import { Div, H1, P, Button, useState, render } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

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
render("App", App);
```

## Core Concepts

### Virtual DOM

MostJS uses a virtual DOM approach to efficiently update the real DOM. The virtual DOM is a lightweight JavaScript representation of the actual DOM, allowing the framework to perform optimized updates.

**Why use a Virtual DOM?**

1. **Performance:** By comparing virtual DOM trees before updating the real DOM, MostJS minimizes expensive DOM operations.
2. **Simplicity:** Developers can describe the UI declaratively without worrying about manual DOM manipulations.
3. **Cross-platform compatibility:** The virtual DOM abstraction makes it easier to adapt to different rendering targets.

At its core, MostJS's virtual DOM nodes are simple JavaScript objects with the following structure:

```js
{
  tag: 'div',           // HTML tag or component name
  props: { /* ... */ }, // Element attributes, event handlers, etc.
  children: [],         // Child nodes or text content
  ref: null             // Reference to actual DOM element (populated after rendering)
}
```

### Creating Elements

In MostJS, you create virtual DOM elements using the `Create` function:

```js
Create(tag, props, ...children)
```

**Parameters:**

* `tag`: The HTML tag name (like 'div', 'span', etc.)
* `props`: An object containing attributes, event handlers, and other properties
* `children`: An array of child elements or text content

**Example:**

```js
const element = Create('div', { 
  className: 'container',
  id: 'main',
  onClick: () => console.log('Clicked!')
}, [
  Create('h1', {}, ["Title"]),
  Create('p', {}, ["Content"])
]);
```

Under the hood, the `Create` function does the following:

1. Processes children, converting strings and numbers to text nodes
2. Returns a virtual DOM node object with the specified tag, props, and children

 **Implementation** :

```js
function Create(tag, props, ...children) {
  const processedChildren = children.flat().map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return {
        type: "text",
        value: child,
        ref: null
      };
    }
    return child;
  });

  return {
    tag,
    props: props || {},
    children: processedChildren,
    ref: null
  };
}
```

### Creation Components

MostJS provides creation-components, which are predefined functions that use the `Create` function internally, making your code cleaner and more readable.

**Example:**

```js
import { Div, P } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

return Div({ className: 'container' }, [
  P({ id: "greeting" }, ["Hello world"])
]);
```

Each creation component is a simple wrapper around the `Create` function:

```js
export function Div(props = {}, children = []) {
  return Create("div", props, children);
}

export function P(props = {}, children = []) {
  return Create("p", props, children);
}
```

#### Available Creation Components

MostJS includes creation components for most common HTML elements. Each one follows the same pattern - accepting props and children, then forwarding them to the `Create` function with the appropriate tag name:

* `Button`: For `<button>` elements
* `Div`: For `<div>` elements
* `Ul`: For `<ul>` elements
* `Li`: For `<li>` elements
* `H1` through `H6`: For heading elements
* `Input`: For `<input>` elements
* `P`: For paragraph elements
* `Span`: For `<span>` elements
* `Link`: For `<a>` elements (with special routing behavior)
* `Aside`: For `<aside>` elements
* `Header`: For `<header>` elements
* `Hr`: For `<hr>` elements
* `Blockquote`: For `<blockquote>` elements
* `Footer`: For `<footer>` elements
* `Section`: For `<section>` elements
* `Label`: For `<label>` elements
* `Main`: For `<main>` elements

**Special Case: Link Component**

The `Link` component deserves special attention as it integrates with the MostJS router:

* Requires an `href` prop
* Automatically opens external links in a new tab
* Intercepts click events to trigger client-side routing
* Supports a `render` parameter to control whether the new route should be rendered immediately

Link(props= {}, children= [], render=true)

render parameter is for choosing to just push the path but not render anything you can acheive same result with

router.pushOnly()

Link is using pushOnly under the hood

### Components

MostJS components are functions that return virtual DOM nodes. Unlike some other frameworks, components in MostJS are pure JavaScript functions, making them intuitive and flexible.

The `Component` function is used to render and manage reusable components:

```js
Component(componentFn, props, title)
```

**Parameters:**

* `componentFn`: The component function to render
* `props`: Properties to pass to the component
* `title`: A unique identifier for the component (required)

**Example:**

```js
import { Div, Component } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';
import Sidebar from './Sidebar.js';
import MainContent from './MainContent.js';

const App = () => {
  return Div({ className: 'app' }, [
    Component(Sidebar, { isCollapsed: false }, "sidebar"),
    Component(MainContent, { title: "Welcome" }, "main-content")
  ]);
};
```

Under the hood, `Component` does the following:

1. Registers the component function with its title
2. Manages component state tracking
3. Handles the component stack for context during rendering
4. Captures and returns the component's virtual DOM representation

 **Implementation** :

```js
function Component(componentFn, props, title) {
  if (!title) {
    console.error("Component must have a title");
    return null;
  }
  
  // Register the component function
  titleToComponentMap.set(title, () => componentFn(props));
  
  // Reset index for hooks
  componentIndexes.set(title, 0);
  
  // Initialize component state if needed
  if (!componentStates.has(title)) {
    componentStates.set(title, { states: [], vdom: null });
  }
  
  // Push component to stack for context
  componentStack.push(title);
  
  try {
    // Render the component
    const vdom = componentFn(props);
  
    // Store the virtual DOM
    componentStates.get(title).vdom = vdom;
  
    // Mark the component title for tracking
    vdom.componentTitle = title;
  
    return vdom;
  } catch (error) {
    console.error(`Error rendering component ${title}:`, error);
    return null;
  } finally {
    // Clean up the stack
    componentStack.pop();
  }
}
```

### State Management

MostJS provides a simple state management system with the `useState` hook, inspired by React's hook system.

#### useState

The `useState` hook allows components to maintain and update state:

```js
const [state, setState] = useState(initialValue);
```

**Parameters:**

* `initialValue`: Initial state value (can be a value or function)

**Returns:**

* An array containing:
  * `state`: Current state value
  * `setState`: Function to update the state

**Example:**

```js
import { Div, Button, useState } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return Div({}, [
    `Count: ${count}`,
    Button({ onClick: () => setCount(count + 1) }, ["Increment"])
  ]);
};
```

**How it works:**

The `useState` implementation:

1. Identifies the current component from the component stack
2. Retrieves or initializes the component's state storage
3. Gets or sets the state at the current index
4. Provides a setter function that:
   * Accepts a new value or a function to compute a new value
   * Performs equality checks based on the state type
   * Triggers a re-render only when the state actually changes

 **Implementation** :

```js
function useState(initial) {
  const component = componentStack.current;
  
  if (!component) {
    console.error("useState called outside component context");
    return [initial, () => {}];
  }
  
  if (!componentStates.has(component)) {
    componentStates.set(component, { states: [], vdom: null });
  }

  const componentState = componentStates.get(component);
  const states = componentState.states;
  const idx = componentIndexes.get(component) || 0;

  // Initialize state if needed
  if (states[idx] === undefined) {
    states[idx] = typeof initial === "function" ? initial() : initial;
  }

  const localIndex = idx;
  const componentTitle = component;

  const setState = (value) => {
    const targetComponentState = componentStates.get(componentTitle);
    if (!targetComponentState) {
      console.error(`Component state not found for ${componentTitle}`);
      return;
    }
  
    const oldValue = targetComponentState.states[localIndex];
    const newValue = typeof value === "function" ? value(oldValue) : value;
  
    let shouldRerender = false;
  
    // Different equality checks based on type
    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      if (oldValue.length !== newValue.length) {
        targetComponentState.states[localIndex] = newValue;
        shouldRerender = true;
      }
      if (!areDepsEqual(newValue, oldValue)) {
        targetComponentState.states[localIndex] = newValue;
        shouldRerender = true;
      }
    }
    else if (isPlainObject(oldValue) && isPlainObject(newValue)) {
      if (!shallowEqualObjects(newValue, oldValue)) {
        targetComponentState.states[localIndex] = newValue;
        shouldRerender = true;
      }
    }
    else if (oldValue !== newValue) {
      targetComponentState.states[localIndex] = newValue;
      shouldRerender = true;
    }
  
    // Schedule re-render if state has changed
    if (shouldRerender) {
      setTimeout(() => {
        rerender(componentTitle);
      }, 0);
    }
  };

  componentIndexes.set(component, idx + 1);
  return [states[localIndex], setState];
}
```

### Handling References

#### useRef

The `useRef` hook provides direct access to DOM elements:

```js
const elementRef = useRef(referenceId);
```

**Parameters:**

* `referenceId`: A unique string identifier that matches a `reference` prop on an element

**Returns:**

* The actual DOM element

**Example:**

```js
import { Div, Input, Button, useRef } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

const SearchField = () => {
  const inputRef = useRef("search-input");
  
  const focusInput = () => {
    inputRef.focus();
  };
  
  return Div({}, [
    Input({ 
      reference: "search-input",
      placeholder: "Search..." 
    }, []),
    Button({ onClick: focusInput }, ["Focus Search"])
  ]);
};
```

**How it works:**

The reference system in MostJS:

1. Uses a global map to store references to DOM elements
2. Requires elements to have a `reference` prop with a unique identifier
3. During element creation, elements with a `reference` prop are added to the refs map
4. The `useRef` function retrieves elements from this map using the identifier

 **Implementation** :

```js
const refs = new Map();

function useRef(reference) {
    if (reference === "BODY") {
        return document.body;
    }
    return refs.get(reference);
}
```

And in the `createElement` function, references are captured:

```js
if (name === "reference") {
  element.setAttribute("reference", val);
  refs.set(val, element);
}
```

### Watching for Changes

#### Watch

The `Watch` function provides a way to perform side effects when dependencies change:

```js
Watch(callback, dependencies);
```

**Parameters:**

* `callback`: Function to execute
* `dependencies`: Array of values to watch (optional)

**Behavior:**

* If no dependency array is provided: The effect runs after every render
* If an empty array (`[]`) is provided: The effect runs only once when the component mounts
* With dependencies: The effect runs when any dependency changes

**Example:**

```js
import { Div, H1, useState, Watch } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

const UserProfile = (props) => {
  const [user, setUser] = useState(null);
  
  Watch(() => {
    fetch(`/api/users/${props.userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [props.userId]); // Re-fetch when userId changes
  
  return Div({}, [
    H1({}, [user ? user.name : "Loading..."])
  ]);
};
```

**How it works:**

The `Watch` implementation:

1. Identifies the current component from the component stack
2. Compares the new dependencies with the previous ones using deep equality
3. If dependencies have changed, schedules the effect to run after render
4. Handles cleanup functions returned from the effect

 **Implementation** :

```js
export function Watch(callback, deps = null) {
    const currentComponent = componentStack.current;

    if (!afterRenderEffects.has(currentComponent)) {
        afterRenderEffects.set(currentComponent, []);
    }

    const effects = afterRenderEffects.get(currentComponent);

    if (!deps) {
        effects.push(() => {
            const cleanup = cleanupFunctions.get(currentComponent);
            if (typeof cleanup === "function") cleanup();

            const result = callback();
            if (typeof result === "function") {
                cleanupFunctions.set(currentComponent, result);
            }
        });
        return;
    }

    if (!Array.isArray(deps)) {
        console.error(
            "%c[Watch Error]%c Expected an array of dependencies.\n" +
            "Wrap dependencies in square brackets like this: %c[dep1, dep2]%c.",
            "color: red; font-weight: bold;",
            "color: white;",
            "color: cyan; font-style: italic;",
            "color: white;"
        );
        return;
    }

    const oldDeps = oldDependencies.get(currentComponent) || [];
    const hasChanged = !areDepsEqual(deps, oldDeps);

    if (hasChanged) {
        oldDependencies.set(currentComponent, [...deps]);

        effects.push(() => {
            const cleanup = cleanupFunctions.get(currentComponent);
            if (typeof cleanup === "function") cleanup();

            const result = callback();
            if (typeof result === "function") {
                cleanupFunctions.set(currentComponent, result);
            }
        });
    }
}
```

### Routing

MostJS provides a built-in router for creating single-page applications. The router allows navigation between different views without full page reloads.

**Key Features:**

* Route registration with path patterns and handlers
* Parameter extraction (e.g., `/users/:id`)
* Query string parsing
* Browser history integration
* Custom 404 handling

**Example:**

```js
import { Div, P, Button, Component, router } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';
import NotFoundHandler from '/assets/components/NotFound.js';
import AsideComponent from '/assets/components/Aside.js';
import Todo from '/assets/components/Todo.js';

const App = () => {
  return Div({ className: 'app' }, [
    Component(AsideComponent, {}, "aside"),
    Component(Todo, {}, "todo-app"),
    Button({
      className: "reset",
      onClick: () => {
        localStorage.removeItem('todos');
        router.reload();
      }
    }, ["Reset"]),
    P({className: "warning"}, 
      "History will only be accessible in the browser where it was saved."
    )
  ]);
};

router.setNotFoundHandler(NotFoundHandler);
router.register("/:filter", App, "Todo App");
router.register("/", App, "Todo App");

router.start();
```

**How the Router Works:**

1. **Route Registration** : The `register` method maps URL patterns to component handlers
2. **Route Matching** : When navigation occurs, the router matches the URL against registered patterns
3. **Parameter Extraction** : Path parameters are extracted and made available via `router.useParams()`
4. **History Management** : The router integrates with the browser's history API
5. **Rendering** : When a route matches, the associated component is rendered to the DOM

 **Implementation Highlights** :

```js
class Router {
  constructor() {
    this.routes = [];
    this.currentParams = {};
    this.currentQuery = {};
    this.history = [];
    this.currentIndex = -1;
    this.initialized = false;
    this.ownDomain = window.location.origin;
    this.notFoundHandler = () => {
      return H1({}, ["404 Not Found"]);
    };

    window.addEventListener("popstate", this._onPopState.bind(this));
  }
  
  register(path, handler, title = window.location.origin) {
    const paramNames = [];
    const regex = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return "([^/]+)";
    });

    this.routes.push({
      path,
      regex: new RegExp(`^${regex}$`),
      handler,
      paramNames,
      title
    });
  }
  
  push(path) {
    const [pathname, queryStr] = path.split("?");
    const query = this._parseQuery(queryStr || "");
    const match = this._matchRoute(pathname);

    if (!match) {
      render("not-found", this.notFoundHandler);
      return;
    }

    const state = { path, id: Date.now() };
    history.pushState(state, "", path);
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(state);
    this.currentIndex++;
    document.title = match.title;
    render(match.path, match.handler);
  }
  
  // Additional methods omitted for brevity
}
```

### Diffing Algorithm

The diffing algorithm is central to MostJS's efficiency. It compares the old and new virtual DOM trees to determine the minimal set of changes required to update the real DOM.

**Key Features:**

* Node type comparison
* Key-based reconciliation
* Attribute and event handler updates
* Child node reconciliation
* Text node updates

**How it Works:**

1. Compare node types (tag names)
2. If key props are used, match by keys first
3. Update attributes and event handlers that have changed
4. Process children, reusing existing nodes where possible
5. Add new nodes and remove deleted ones

 **Implementation** :

```js
function diff(oldVNode, newVNode) {
  if (!oldVNode || !newVNode) return;
  const parentEl = oldVNode.ref
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];

  let currentDomIndex = 0;
  const matchedOld = new Set();

  // First pass: Match by key
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    let matchIndex = -1;

    if (newChild.props?.key != null) {
      for (let j = 0; j < oldChildren.length; j++) {
        if (matchedOld.has(j)) continue;

        const oldChild = oldChildren[j];
        if (oldChild.props?.key === newChild.props.key) {
          matchIndex = j;
          break;
        }
      }
    }

    // Second pass: Match by type
    if (matchIndex === -1) {
      for (let j = 0; j < oldChildren.length; j++) {
        if (matchedOld.has(j)) continue;

        const oldChild = oldChildren[j];
        const isMatch =
          (newChild.tag && oldChild.tag && newChild.tag === oldChild.tag) ||
          (newChild.type === "text" && oldChild.type === "text");

        if (isMatch) {
          matchIndex = j;
          break;
        }
      }
    }

    if (matchIndex !== -1) {
      const oldChild = oldChildren[matchIndex];
      patchElement(oldChild, newChild);
      if (newChild.tag || newChild.type) {
        diff(oldChild, newChild);
      }
      matchedOld.add(matchIndex);

      // Ensure node is in correct DOM position
      const existing = oldChild.ref;
      const refAtIndex = parentEl.childNodes[currentDomIndex];
      if (refAtIndex !== existing) {
        parentEl.insertBefore(existing, refAtIndex || null);
      }

      newChild.ref = existing;
    } else {
      // Create new node
      if (typeof newChild != "boolean") {
        const newEl = createElement(newChild);
        newChild.ref = newEl;
        const refAtIndex = parentEl.childNodes[currentDomIndex];
        parentEl.insertBefore(newEl, refAtIndex || null);
      }
    }

    currentDomIndex++;
  }

  // Remove nodes that weren't matched
  oldChildren.forEach((oldChild, index) => {
    if (!matchedOld.has(index)) {
      oldChild.ref?.remove();
    }
  });

  // Update parent reference
  newVNode.ref = oldVNode.ref;

  // Update component state
  const currentComponent = componentStack.current;
  componentStates.get(currentComponent).vdom = { newVNode };
}
```

### Rendering

MostJS's rendering system is responsible for converting the virtual DOM into real DOM elements and updating the DOM when state changes.

**Primary Rendering Functions:**

1. **createElement** : Creates actual DOM elements from virtual nodes
2. **render** : Initial rendering of a component to the DOM
3. **rerender** : Updates the DOM when component state changes

 **Implementation of createElement** :

```js
function createElement(node) {
  if (typeof node == "boolean" || node === null || node === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof node === "function") {
    return createElement(node());
  }

  if (node.type === "text") {
    const textNode = document.createTextNode(String(node.value));
    node["ref"] = textNode;
    return textNode;
  }

  const element = document.createElement(node.tag);

  const props = node.props || {};
  const children = node.children || [];

  Object.entries(props).forEach(([name, val]) => {
    if (name.startsWith("on") && typeof val === "function") {
      element[name.toLowerCase()] = val;
    } else if (name === "className") {
      element.className = val;
    } else if (name === "reference") {
      element.setAttribute("reference", val);
      refs.set(val, element);
    } else if (name === "style" && typeof val === "object") {
      Object.assign(element.style, val);
    } else {
      element.setAttribute(name, val);
    }
  });

  children.forEach((child) => {
    if (typeof child === "function") {
      const childNode = child();
      element.appendChild(createElement(childNode));
    } else {
      element.appendChild(createElement(child));
    }
  });

  node["ref"] = element;
  return element;
}
```

 **Implementation of render** :

```js
function render(componentTitle, componentFn, props={}) {
  let rootElement = document.getElementById("root");
  componentStates.clear();
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
  } else {
    rootElement.innerHTML = "";
  }
  
  if (!componentStates.has(componentTitle)) {
    componentStates.set(componentTitle, { states: [], vdom: null });
  }
  
  titleToComponentMap.set(componentTitle, componentFn);
  
  componentIndexes.set(componentTitle, 0);
  
  componentStack.push(componentTitle);
  const vdom = componentFn(props);
  const element = createElement(vdom);
  vdom.ref = element;
  
  const componentState = componentStates.get(componentTitle);
  componentState.vdom = vdom;
  componentStates.set(componentTitle, componentState);
  componentStack.pop();
  
  rootElement.appendChild(element);
  return element;
}
```

 **Implementation of rerender** :

```js
function rerender(componentTitle) {
  const componentFn = titleToComponentMap.get(componentTitle);
  if (!componentFn) {
    console.error(`Component function not found for ${componentTitle}`);
    return;
  }
  
  componentIndexes.set(componentTitle, 0);
  
  const componentState = componentStates.get(componentTitle);
  if (!componentState) {
    console.error(`Component state not found for ${componentTitle}`);
    return;
  }
  
  const oldVdom = componentState.vdom;
  if (!oldVdom) {
    console.error(`Invalid vdom for component ${componentTitle}`);
    return;
  }
  
  componentStack.push(componentTitle);
  const vdom = componentFn();
  
  diff(oldVdom, vdom);
  componentState.vdom = vdom;
  
  applyCallbacksAfterRender();
  
  componentStack.pop();
}
```

## API Reference

### Core Functions

| Function                                       | Description                                     |
| ---------------------------------------------- | ----------------------------------------------- |
| `Create(tag, props, ...children)`            | Creates a virtual DOM element                   |
| `Component(componentFn, props, title)`       | Renders a reusable component                    |
| `useState(initialValue)`                     | Creates a state variable with getter and setter |
| `useRef(referenceId)`                        | Accesses a DOM element by reference ID          |
| `Watch(callback, dependencies)`              | Runs side effects when dependencies change      |
| `render(componentTitle, componentFn, props)` | Renders a component to the DOM                  |

### Creation Components

| Component                                         | HTML Equivalent     | Description                         |
| ------------------------------------------------- | ------------------- | ----------------------------------- |
| `Button(props, children)`                       | `<button>`        | Button element                      |
| `Div(props, children)`                          | `<div>`           | Division element                    |
| `Ul(props, children)`                           | `<ul>`            | Unordered list                      |
| `Li(props, children)`                           | `<li>`            | List item                           |
| `H1(props, children)`to `H6(props, children)` | `<h1>`to `<h6>` | Heading elements                    |
| `Input(props, children)`                        | `<input>`         | Input element                       |
| `P(props, children)`                            | `<p>`             | Paragraph element                   |
| `Span(props, children)`                         | `<span>`          | Span element                        |
| `Link(props, children, render)`                 | `<a>`             | Anchor element with routing support |
| `Aside(props, children)`                        | `<aside>`         |                                     |
