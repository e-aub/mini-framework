let states = [];
let index = 0;
let lastComponentIndex = 0;
let stateToComponent = new Map();

function useState(initialState) {
    if (typeof states[index] === 'undefined') {
        if (typeof initialState === 'function') {
            states[index] = initialState();
        } else {
            states[index] = initialState;
        }
    }
    const localIndex = index;

    const setState = (newState) => {
        if (typeof newState === 'function') {
            states[localIndex] = newState(states[localIndex]);
        } else {
            states[localIndex] = newState;
        }
        rerender(); 
    };

    const state = states[localIndex];
    index++;
    return [state, setState];
}

function render(component) {
    lastComponentIndex = index;
    const result = component();
    for (let i = lastComponentIndex; i < index; i++) {
        stateToComponent.set(i, component);
    }
    lastComponentIndex = index;
    return result;
}

function rerender(component) {
    if (component) {
        index = 0; // Reset index for re-render
        component();
    }
}

// function test() {
//     index = 0; // Reset index to simulate re-render
//     const [count, setCount] = useState(0);
//     const persons =  ["john", "jane", "jim", "jill"];
//     const [person, setPerson] = useState(null);
//     const button = document.getElementById('count');
//     const countDisplay = document.getElementById('count-display');
//     const personDisplay = document.getElementById('person-display');
//     button.onclick = () => {
//         setCount((count) => count + 1);
//         setPerson((person) => persons[count]);
//     };

//     countDisplay.textContent = `Count: ${count}`;
//     personDisplay.textContent = `Person: ${person}`;
// }

// function rerender() {
//     test(); // Re-run the component
// }

// test(); // Initial render

export default useState;
