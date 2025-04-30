import { currentComponent, rerender } from "./dom.js";
import { shallowEqualObjects, areDepsEqual, isPlainObject } from "./watch.js";

const componentStates = new Map();
const componentIndexes = new Map();

function useState(initial) {
  for (let sfd of componentStates.values()) {
    console.log(sfd);
  }
  console.log("call to useState");
  const component = currentComponent.component;
  console.log(component);
  if (!componentStates.has(component)) {
    componentStates.set(component, { states: [], vdom: null });
  }

  const componentState = componentStates.get(component);
  const states = componentState.states;
  const idx = componentIndexes.get(component) || 0;

  if (states[idx] === undefined) {
    states[idx] = typeof initial === "function" ? initial() : initial;
  }

  const localIndex = idx;

  const setState = (value) => {
    console.log("call to setState");
    console.log(states);
    const oldValue = states[localIndex];
    const newValue = typeof value === "function" ? value(oldValue) : value;
    if (Array.isArray(states[localIndex]) && Array.isArray(newValue)) {
      if (!areDepsEqual(newValue, oldValue)) {
        states[localIndex] = newValue;
        rerender(component);
      }
      return;
    }

    if (isPlainObject(states[localIndex]) && isPlainObject(newValue)) {
      if (!shallowEqualObjects(newValue, oldValue)) {
        states[localIndex] = newValue;
        rerender(component);
      }
      return;
    }
    if (oldValue !== newValue) {
      states[localIndex] = newValue;
      rerender(component);
    }
  };

  componentIndexes.set(component, idx + 1);
  return [states[localIndex], setState];
}



export { useState, componentStates, componentIndexes };
