import { jsx, render, useState, Div, P, Button, Component, Link, router, Aside, Header, H3, H5, Span } from '/framework/index.js';

const App = () => {
  return Aside({className: "learn"}, [
    Header({}, [
      H3({}, "MostJS TodoMVC"),
      Span({className: "source-links"}, [
      H5({}, "Source:"),
      Link({href: "https://github.com/mostjs/most-todomvc"},"source"),
      Link({href: "/frameworkasdasd"},"framework")
      ])
    ]),
  ])
}


router.register("/", App);
router.start();

