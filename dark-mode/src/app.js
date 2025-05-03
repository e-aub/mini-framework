

import { Div, P, H1, useState, Watch,render, Button, Component } from '/framework/index.js';

const UserProfile = (props) => {
  const [user, setUser] = useState(null);
  
  Watch(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${props.userId}`)
      .then(res => res.json())
      .then(setUser((data) => data));
  }, [props.userId]);
  
  return Div({}, [
    H1({reference : "user-name"}, [user])
  ]);
};


const App = () => {
  const [id, setId] = useState(1);

  return(
    Div({className: "app"},[
      Button({
        className: "next-id",
        onclick: () => {
       setId((id) => id + 1);
        }
      },`${id}`),
      Component(UserProfile, { userId: id }, "user-profilesss")
    ])
   
  )

}

render("App", App);
