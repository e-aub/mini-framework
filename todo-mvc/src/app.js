// import { useState, Div, P, Button, Component, Link, router, Aside, Header,H1, H3,H4, H5, Span, Hr,Main, Blockquote, Footer, Ul, Li, Section, Label, Input } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.1.0/index.js';
import {Div, P, Button, Component, router } from '/framework/index.js';
import NotFoundHandler from '/assets/src/components/NotFound.js';
import AsideComponent from '/assets/src/components/Aside.js';
import Todo from '/assets/src/components/Todo.js';



const App = () => {
  return Div({ className: 'app' }, [
    Component(AsideComponent, {}, "aside"),
    Component(Todo, {}, "todo-app"),
    Button({
      className: "reset",
      onclick: () => {
        localStorage.removeItem('todos');
        router.reload();
      }
    }, "Reset"),
    P({className: "warning"}, "History will only be accessible in the browser where it was saved. If you use a different browser, a new, independent history will be created there.")
  ])
}

router.setNotFoundHandler(NotFoundHandler);
router.register("/:filter", App, "Todo App");
router.register("/", App, "Todo App");

router.start();

