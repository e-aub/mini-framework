# **Mini JavaScript Framework - Project Plan**

## **📌 Task Division**

### **👤 Member 1: Core Framework Development**
#### **Responsibilities:**
- Build a virtual DOM representation in JSON format.
- Implement functions to create, update, and remove elements.
- Implement a custom event handling system (not using `addEventListener` directly).
- Implement state management (centralized state handling).

#### **Tasks:**
- Create a function to convert JSON objects into real DOM elements.
- Implement a diffing algorithm for updating only the necessary DOM parts.
- Design a simple state management system.
- Create a function to register and trigger custom events.

#### **Resources:**
- [Virtual DOM Concept](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-architecture-from-scratch-624a3a79438b)
- [How React’s Virtual DOM Works](https://react.dev/learn/render-and-commit)
- [State Management Basics](https://redux.js.org/tutorials/fundamentals/part-1-overview)

---

### **👤 Member 2: Routing System & URL Synchronization**
#### **Responsibilities:**
- Implement a routing system based on URL changes.
- Handle navigation dynamically without full-page reloads.
- Sync state changes with the URL.

#### **Tasks:**
- Use the `history.pushState` API for client-side routing.
- Create a function to listen to URL changes and render the correct component.
- Connect routing with state management so that URL changes update the state.

#### **Resources:**
- [Understanding Frontend Routing](https://dev.to/jlong4223/understanding-front-end-routing-4m6n)
- [How Single Page Apps (SPAs) Work](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

---

### **👤 Member 3: TodoMVC Implementation & Documentation**
#### **Responsibilities:**
- Implement a functional **TodoMVC** app using the custom framework.
- Ensure UI updates correctly when the state changes.
- Write clear documentation explaining how to use the framework.

#### **Tasks:**
- Build a simple UI with an input field, add button, and task list.
- Implement functionality for adding, deleting, and toggling tasks.
- Ensure the state remains persistent across page refreshes.
- Write a `README.md` with:
  - Installation instructions.
  - How to create elements, handle events, and manage state.
  - Example code snippets.

#### **Resources:**
- [TodoMVC Example in Vanilla JS](https://todomvc.com/examples/vanillajs/)
- [How to Write Good Documentation](https://www.writethedocs.org/)

---

## **📂 Project Structure**
```
/mini-framework
│── /framework
│   │── dom.js          # DOM abstraction and virtual DOM
│   │── state.js        # State management system
│   │── events.js       # Custom event handling system
│   │── router.js       # Client-side routing system
│   └── index.js        # Entry point for the framework
│
│── /todomvc
│   │── index.html      # Main HTML file
│   │── app.js         # Implements the TodoMVC with the framework
│   │── styles.css      # Basic styling
│   └── todos.js       # Manages todo logic
│
│── /docs
│   └── README.md       # Framework documentation
│
└── package.json        # Project dependencies and scripts
```

---

## **👨‍💻 How to Begin?**

1. **Set Up the Project:**  
   - Create the folder structure above.  
   - Initialize a Git repository:  
     ```sh
     git init
     ```
   - Create a `package.json`:  
     ```sh
     npm init -y
     ```

2. **Each Member Works on Their Assigned Tasks:**
   - Member 1 starts by building `dom.js`, `state.js`, and `events.js`.
   - Member 2 develops `router.js` and connects it to the framework.
   - Member 3 starts by setting up the TodoMVC UI and documentation.

3. **Integrate Everything Together:**
   - Member 3 uses the framework to implement TodoMVC.
   - Members 1 & 2 fix any issues in their implementations.

4. **Test and Debug:**  
   - Each member ensures their part is working independently.  
   - Then test the full integration.

5. **Finalize Documentation:**  
   - Write step-by-step usage instructions in `README.md`.

---

This structure ensures a **clean workflow**, with each member having a **clear focus** while working towards a **functional mini-framework**. 🚀
