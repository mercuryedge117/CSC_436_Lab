import { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";

import UserBar from "./user/UserBar";
import CreateTodo from "./todo/CreateTodo";
import TodoList from "./todo/TodoList";

import appReducer from "./reducers";
import { StateContext } from "./contexts";

function App() {

  const init = []

  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    todos: init,
  });

  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: {Authorization: `${state?.user?.access_token}`}
  }));

  useEffect(getTodos, [state?.user?.access_token]);

  useEffect(() => {
    if (todos && todos.isLoading === false && (todos.data || todos.error)) {
      if (todos.error) {
        console.log(todos.error.message);
      } else {
        dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
      }
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
    </div>
  )       
}


export default App;
