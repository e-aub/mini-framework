import { currentComponent, rerender } from "./dom.js";
import { shallowEqualObjects, areDepsEqual, isPlainObject } from "./watch.js";

const componentStates = new Map();
const componentIndexes = new Map();

function useState(initial) {
  if (!componentStates.has(currentComponent)) {
    componentStates.set(currentComponent, { states: [], vdom: null });
  }

  const componentState = componentStates.get(currentComponent);
  const states = componentState.states;
  const idx = componentIndexes.get(currentComponent) || 0;

  if (states[idx] === undefined) {
    states[idx] = typeof initial === "function" ? initial() : initial;
  }

  const localIndex = idx;

  const setState = (value) => {
    const oldValue = states[localIndex];
    const newValue = typeof value === "function" ? value(oldValue) : value;
    if (Array.isArray(states[localIndex]) && Array.isArray(newValue)) {
      if (!areDepsEqual(newValue, oldValue)) {
        states[localIndex] = newValue;
        rerender(currentComponent);
      }
      return;
    }

    if (isPlainObject(states[localIndex]) && isPlainObject(newValue)) {
      if (!shallowEqualObjects(newValue, oldValue)) {
        states[localIndex] = newValue;
        rerender(currentComponent);
      }
      return;
    }
    if (oldValue !== newValue) {
      states[localIndex] = newValue;
      rerender(currentComponent);
    }
  };

  componentIndexes.set(currentComponent, idx + 1);
  return [states[localIndex], setState];
}


function UseStore(initial) {
  if (!componentStates.has(currentComponent)) {
    componentStates.set(currentComponent, { states: [], vdom: null });
  }

  const componentState = componentStates.get(currentComponent);
  const states = componentState.states;
  const idx = componentIndexes.get(currentComponent) || 0;

  if (states[idx] === undefined) {
    states[idx] = typeof initial === "function" ? initial() : initial;
  }

  const localIndex = idx;

  const setState = (value) => {
    const oldValue = states[localIndex];
    const newValue = typeof value === "function" ? value(oldValue) : value;

    if (Array.isArray(states[localIndex]) && Array.isArray(newValue)) {
      if (!areDepsEqual(newValue, oldValue)) {
        states[localIndex] = newValue;
      }
      return;
    }

    if (isPlainObject(states[localIndex]) && isPlainObject(newValue)) {
      if (!shallowEqualObjects(newValue, oldValue)) {
        states[localIndex] = newValue;
      }
      return;
    }
    if (oldValue !== newValue) {
      states[localIndex] = newValue;
    }
  };

  componentIndexes.set(currentComponent, idx + 1);
  return [states[localIndex], setState];
}

export { useState, componentStates, componentIndexes, UseStore };
