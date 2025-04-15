import { createElement } from "./chaos.js";

const root = document.getElementById("root");

const routes = {};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const page = routes[path];
  root.appendChild(createElement(page));
};

window.route = route;
