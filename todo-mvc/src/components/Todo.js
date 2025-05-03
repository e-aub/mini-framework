import { Div, H1, Input, Button, Ul, Li, Section, Header,Label, Main, Footer, Span, Link, useState, router } from '/framework/index.js';



export default function Todo () {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState(() => {
    return router.useParams().filter || "all";
  });

  const [invalidInput, setInvalidInput] = useState(false);

  function validateInput(input) {
    if (!input) {
      return false;
    }

    for (let i =0; i < todos.length; i++){
      if (todos[i].text === input) {
        return false;
      }
    }
    return true;
  }

  return Section({className: "todoapp", id : "root"}, [
    Header({className: "header"}, [
      H1({}, "todos"),
      Div({className: `input-container ${invalidInput ? 'invalid' : ''}`}, [
        Input({id : "todo-input",
          className: "new-todo", 
          type: "text",
          value: input,
          onkeydown: (e) => {
            if (e.key === "Enter") {
              if (!validateInput(input)) {
                setInvalidInput(true);
                return;
              }
              setInvalidInput(false);
              setTodos(newTodos => {
                const updated = [...newTodos, { text: input, completed: false }];
                localStorage.setItem('todos', JSON.stringify(updated));
                return updated;
              });
              
              setInput('');
            }
          },
          oninput: (e) => {
            setInput(e.target.value);
            setInvalidInput(!validateInput(e.target.value));
          },
          placeholder: "What needs to be done?"}),
        Label({className: "Visually-hidden", for: "todo-input"})
      ])
    ]),
    Main({className: "main"}, [
      Ul({className: "todo-list"}, 
        todos.filter((todo) => filter === 'all' || filter === 'active' && !todo.completed || filter === 'completed' && todo.completed).map((todo) => {
          return Li({className: `todo-item ${todo.completed ? 'completed' : ''}`, key: todo.text, }, [
            Div({className: "view"}, [
              Input({className: `toggle ${todo.completed ? 'checked' : ''}`, 
                oninput: (e) => setTodos(prev => {
                  const updated = prev.map(t => t === todo ? { ...t, completed: e.target.checked } : t);
                  localStorage.setItem('todos', JSON.stringify(updated));
                  return updated;
                }),
                type: "checkbox"}),
              Label({className: "label"}, todo.text),
              Button({className: "destroy", 
                onclick: () => setTodos(prev => {
                  const updated = prev.filter(t => t !== todo);
                  localStorage.setItem('todos', JSON.stringify(updated));
                  return updated;
                })
                })
            ])
          ])
        })
      )
    ]),
    Footer({className: "footer"}, [
      Span({className: "todo-count"}, [
        Span({}, `${todos.reduce((acc, todo) => !todo.completed ? acc + 1 : acc, 0)} item left`)
      ]),
      Ul({className: "filters"}, [
        Li({className: filter === "all" ? "selected" : "", onclick: () => setFilter("all")}, Link({href: "/all"}, "All", false)),
        Li({className: filter === "active" ? "selected" : "", onclick: () => setFilter("active")}, Link({href: "/active"}, "Active", false)),
        Li({className: filter === "completed" ? "selected" : "", onclick: () => setFilter("completed")}, Link({href: "/completed"}, "Completed", false))
      ]),
      Div({className: "clear-completed"}, [
        Button({className: "clear-completed", 
          onclick: () =>{
            setTodos(() => {
              const updated = todos.filter((todo) => !todo.completed);
              localStorage.setItem('todos', JSON.stringify(updated));
              return updated;
            });
          }
        }, "Clear completed")
      ])
    ])
  ])
}
