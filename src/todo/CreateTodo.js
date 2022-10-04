import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo ({user, todos, setTodos }) {
    const [ title, setTitle ] = useState('')
    const [ description, setDesc ] = useState('')

    function handleCreate () { 
        const newTodo = { title, description, author: user , dateCreated: Date.now(), id: uuidv4(),};
        setTodos([ newTodo, ...todos ]);
    }
  
 
    return (
        <form
        onSubmit={(e) => {
            e.preventDefault(); 
            handleCreate ();
        }}
      >
        <div>
          Author: <b>{user}</b>
        </div>
        <div>
          <label htmlFor="create-title">Title:</label>
          <input
            type="text"
            name="create-title"
            id="create-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <textarea
          value={description}
          onChange={(event) => setDesc(event.target.value)}
        />
        <input type="submit" value="Create" disabled={title.length === 0}/>
      </form>
    )
}
