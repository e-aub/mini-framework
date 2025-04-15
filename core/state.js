const Chaos = (() => {
  const states = [];
  const stateIndex = [];

  const useState = (initVal) => {
    const currentIndex = stateIndex;
    states[currentIndex] =
      states[currentIndex] === undefined ? initVal : states[currentIndex];
    const setState = (newVal) => {
      states[currentIndex] = newVal;
      render();
    };
    return [states[currentIndex], setState];
  };

  const jsx = () => {};
  const createElement = () => {};
  const render = () => {};
  return { useState, jsx, createElement, render };
})();

const { useState, jsx, createElement, render } = Chaos;
