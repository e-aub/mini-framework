get started with MostJs by hackerman A frontend framework that let you in controle instead of controling you. you will use the framework not worrying writing some js code you liked somewhere

Take a quick tour lesson

1\- creating elements

creating elements in MostJs is simple you have one function for creating elements

```js
jsx(tag, props, ...children)
```

it takes the tag argument is name of element you want to create, second argument is the props you want this element to take or attributes attaching events -see more on events in this section
the second argument is an array of children to that you want, children should be component function or created an element with jsx function.

```js
  const app = () => {
            return jsx('div', {
                className: 'app'
                },
            [
                    jsx('h1', {
   
                    }, ["Hello, World!"])
                ]
            );
        }
```

MostJS takes this input and create a virtual dom to reflect whats in the real dom when a rerender happens[see more about rerendering in this section] a new virtual dom is generated and compared with the old virtual dom and use a diffing algorithm to know which part should we edit in real dom MostJS do his best to make less changes in real dom cause we all know how expensive it is but optimizing too much cause you that you forget about some other things or cases and consume memory now we have just a basic approach simplified the maximum we want to make it hybrid and smarter to do litteraly the needed changes with minimum costs

2- components

a component function have on rule is that its return value should be a jsx function call [definition of component]

4- rerendering

in the rerendering happens in two cases so far in MostJS in state changes using

```js
setState(value);
```

and the values are not deep equal in case of referece change MostJS compare deep quality, (we think to make it in the future a choice of user to set condition between use deep equality or the other)

second thing that trigger rerender is the use of

```js
 Watch(callback, deps)
```

[see more about Watch]

when a rerender happen the rerendering happens only the the componen who own that state and its children when the two old and new virtual dom are compared with our diff algorithm [see how our diff algorith works] a patch is generated to apply on the real document

3- useState
use state is a function that can be used only inside component function it takes an initial state either a value ou function that will return a value or just some falsy value useState have two return values the state which is the value and the setter of the state which provided previous value to do a change to it or just replace with something new setState causes the rerender of the owner component and its children so minimize declaring most of states in the parent and pass them as props to children if a child has the setter and used it it will cause the rerender of the parent which is the owner of the state and its setter put each state in its right component

4- useRef

useRef

```js
 useRef(reference)
```

is a function that takes a reference and it returns it reference in the real dom to do whathever you want to do with the real dom directly but wait what is reference
reference is something unique that you give it to an element in creation in props to be set in the attributes of element and store it for you so whenever needed a reference call it with the refernce you gave it in creation and bom haha thats mooost of js

here is an example

```js
export const App = () => {

  const background = useRef("todo-container");
const header = useRef("header");
const [isDark, setIsDark] = useState(false);



Watch(()=>{
	background.style.backgroundColor = isDark ? #0000 : #fff;
	header.style.color = isDark ? #0000 : #fff;

}, [isDark]);

return Div({className: "container, reference: "todo-container"},
	[H1({reference : "header"}, ["hello World"]),
	Button({onclick: setIsDark(!isDark)}, [`switch to ${isDark ? 'light': 'dark'} mode`])
]);
})



```

we used use ref by identifying an element with reference get it with use ref whenever you need it

5- Watch

Watch is a function that takes two arguments callback and dependencies whenever a dependency of the dependency array changed it executes the callback not that in comparison between old and new value is a deep equality if they are not deep equal thats considired a change (in upcoming versions we plan to add it in configuration as in some cases we dont need deep equality)

if no dependency array is provided it runs only in mount if empty dependency array it runs in every rerender

```
write for me an example

```

6- Routing

deep equality in all states changes
