import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import CreateTodo from "./todo/CreateTodo";
import TodoList from "./todo/TodoList";

import appReducer from "./reducers";

function App() {
  // const [ user, setUser ] = useState('');

  const init = [
    {
      title: "test todo",
      content: "If you seen this, means it's worked",
      author: "Me",
      dateCreated: Date.now(),
      complete: false,
      id: uuidv4(),
    },
  ]

  // const [user, dispatchUser] = useReducer(userReducer, "");
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: init,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} />
      <br />
      <br />
      {state.user && <CreateTodo user={state.user} dispatch={dispatch} />}
    </div>
  )       
}


export default App;
