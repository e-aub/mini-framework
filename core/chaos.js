const root = document.getElementById("root");

const Chaos = (() => {
  const states = [];
  let stateIndex = 0;
  let currentRootComponent = null;

  const useState = (initVal) => {
    const currentIndex = stateIndex;
    if (states[currentIndex] === undefined) {
      states[currentIndex] = initVal;
    }
    
    const setState = (newVal) => {
      if (typeof newVal === "function") {
        states[currentIndex] = newVal(states[currentIndex]);
      } else {
        states[currentIndex] = newVal;
      }
      render();
    };
  
    stateIndex++;
    return [states[currentIndex], setState];
  };

  const c = (type, props, ...children) => {
    if (typeof type == "function") {
      return type({ ...props, children });
    }
    return { type, props: props || {}, children };
  };

  const createElement = (node) => {
    const element = document.createElement(node.type);

    Object.entries(node.props).forEach(([name, Val]) => {
      switch (name) {
        case "id":
          element.id = Val;
          break;
        case "className":
          element.className = Val;
          break;
        case "title":
          element.title = Val;
          break;
        default:
          if (name.startsWith("on") && typeof Val == "function") {
            element[name.toLowerCase()] = Val;
          } else {
            element.setAttribute(name, Val);
          }
      }
    });

    node.children.flat().forEach((child) => {
      if (
        typeof child == "string" ||
        typeof child == "number"
      ) {
        element.appendChild(document.createTextNode(String(child)));
      } else {
        element.appendChild(createElement(child));
      }
    });

    return element;
  };

  const render = (Component) => {
    if (Component) {
      currentRootComponent = Component;
    }
    root.replaceChildren(createElement(currentRootComponent()));
  };
  stateIndex = 0;
  return { useState, c, createElement, render };
})();

export const { useState, c, createElement, render } = Chaos;
