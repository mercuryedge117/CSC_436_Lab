import { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";

import UserBar from "./user/UserBar";
import CreateTodo from "./todo/CreateTodo";
import TodoList from "./todo/TodoList";

import appReducer from "./reducers";
import { StateContext } from "./contexts";

function App() {

  const init = [
    // {
    //   title: "test todo",
    //   content: "If you seen this, means it's worked",
    //   author: "Me",
    //   dateCreated: Date.now().toString(),
    //   complete: false,
    //   id: uuidv4(),
    // },
  ]

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: init,
  });

  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
          <UserBar />
          <TodoList />
          <br />
          <br />
          {state.user && <CreateTodo />}
      </StateContext.Provider>

      {/* <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} dispatch={dispatch}/>
      <br />
      <br />
      {state.user && <CreateTodo user={state.user} dispatch={dispatch}/>} */}
    </div>
  )       
}


export default App;
