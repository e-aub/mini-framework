import { currentComponent, render, c, rerender } from './dom.js';

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
        states[idx] = typeof initial === 'function' ? initial() : initial;
    }

    const localIndex = idx;

    
    const setState = (value) => {
        console.log("setState", value, localIndex);
        const oldValue = states[localIndex];
        const newValue = typeof value === 'function' ? value(oldValue) : value;
        
        
        if (oldValue !== newValue) {
            states[localIndex] = newValue;
            rerender(currentComponent);
        }
    };

    componentIndexes.set(currentComponent, idx + 1);
    return [states[localIndex], setState];
}

export { useState, componentStates, componentIndexes };
