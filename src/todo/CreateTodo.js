import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo ({user, dispatch }) {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    // function handleCreate () { 
    //     const newTodo = { title, content, author: user , dateCreated: Date.now(), id: uuidv4(),};
    //     setTodos([ newTodo, ...todos ]);
    // }
  
 
    return (
        <form
        onSubmit={(e) => {
            e.preventDefault(); 
            // handleCreate ();
            dispatch({ type: "CREATE_TODO", title, content, author: user, dateCreated: Date.now(), id: uuidv4(), dispatch});
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
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <input type="submit" value="Create" disabled={title.length === 0}/>
      </form>
    )
}
