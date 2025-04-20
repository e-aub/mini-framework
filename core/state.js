// useState.js
import { currentComponent, render } from './dom.js';
// A map to store the state for each component
const componentStates = new Map(); // Component → {states: [], vdom: null}
const componentIndexes = new Map(); // Component → current hook index

function useState(initial) {
    // Ensure component state exists
    if (!componentStates.has(currentComponent)) {
        componentStates.set(currentComponent, { states: [], vdom: null });
    }
    
    const componentState = componentStates.get(currentComponent);
    const states = componentState.states;
    const idx = componentIndexes.get(currentComponent) || 0;

    // Initialize state if this is the first time this hook is used
    if (states[idx] === undefined) {
        states[idx] = typeof initial === 'function' ? initial() : initial;
    }

    const localIndex = idx;

    // Set state function to update the state and rerender the component
    const setState = (value) => {
        states[localIndex] = typeof value === 'function'
            ? value(states[localIndex])
            : value;

        rerender(currentComponent);
    };

    componentIndexes.set(currentComponent, idx + 1);
    return [states[localIndex], setState];
}

function rerender(componentFn) {
    render(componentFn);
}

export { useState, rerender, componentStates, componentIndexes, currentComponent };
