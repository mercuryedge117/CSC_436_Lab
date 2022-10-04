import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import CreateTodo from "./todo/CreateTodo";
import TodoList from "./todo/TodoList";

function App() {
  const [ user, setUser ] = useState('');

  const init = [
    {
      title: "test todo",
      description: "If you seen this, means it's worked",
      author: "Me",
      dateCreated: Date.now(),
      id: uuidv4(),
    },
  ]

  const [ todos, setTodos ] = useState(init)

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      <TodoList todos={todos} />
      <br />
      <br />
      {user && <CreateTodo user={user} todos={todos} setTodos={setTodos} />}
    </div>
  )       
}


export default App;
