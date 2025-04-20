let states = [];
let index = 0;
let lastComponentIndex = 0;
let stateToComponent = new Map();

export function useState(initialState) {
    if (typeof states[index] === 'undefined') {
        if (typeof initialState === 'function') {
            states[index] = initialState();
        } else {
            states[index] = initialState;
        }
        var localIndex = index;
        index++;
    }

    const setState = (newState) => {
        if (typeof newState === 'function') {
            states[localIndex] = newState(states[localIndex]);
        } else {
            states[localIndex] = newState;
        }
        console.log(states[localIndex]);
        rerender(localIndex); 
    };

    const state = states[localIndex];
    console.log("staaaaaaaaaaaaaaaate", state, "local", localIndex)
    return [state, setState];
}
var root = document.getElementById("root");
function Component(func, props) {
    return func(props);
}
function createElement(tag, props, children) {
    return {
        tag: tag,
        props: props || {},
        children: children || [],
    };
}
function c(node) {
    if (typeof node === "string" || typeof node === "number") {
        return document.createTextNode(String(node));
    }
    var element = document.createElement(node.tag);
    Object.entries(node.props).forEach(function (_a) {
        var name = _a[0], Val = _a[1];
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
                if (name.startsWith("on") && typeof Val === "function") {
                    element[name.toLowerCase()] = Val;
                }
                else {
                    element.setAttribute(name, Val);
                }
        }
    });
    node.children.forEach(function (child) {
        element.appendChild(c(child));
    });
    return element;
}
function render(component, props, root) {

    lastComponentIndex = index;
    var vdom = component(component, props);
    for (let i = lastComponentIndex; i < index; i++) {
        stateToComponent.set(i, component);
    }
    lastComponentIndex = index;
    root.appendChild(c(vdom));
}

function rerender(stateIndex) {
    let component = stateToComponent.get(stateIndex);
    console.log(component);
    const newVdom = component();
    console.log(newVdom.tag)
    root.innerHTML = "";
    root.appendChild(c(newVdom));
}


// ✅ Finally, use the render function
render(function () {
    index = 0;
    const [count, setCount] = useState(0);
    return createElement("div", { className: "example-component" }, [
        createElement("h1", { className: "title" }, ["Hello Virtual DOM!"]),
        createElement("button", { onClick: () => setCount(count + 1) }, ["Click me"]),
        createElement("p", { className: "count" }, [count])
    ]);
}, {}, root);
