import { useState, useContext, useEffect } from 'react';
// import { v4 as uuidv4 } from "uuid";

import { StateContext } from '../contexts';
import { useResource } from "react-request-hook";

export default function CreateTodo () {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ error, setError ] = useState(false);

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    const [ todo , createTodo ] = useResource(({ title, content, author, dateCreated, complete }) => ({
      url: '/todos',
      method: 'post',
      data: { title, content, author, dateCreated, complete }
    }));

    useEffect(() => {
      if (todo?.error) {
        setError(true);
        //alert("Something went wrong creating post.");
      }
      if (todo?.isLoading === false && todo?.data) {
        dispatch({
          type: "CREATE_TODO",
          title: todo.data.title,
          content: todo.data.content,
          author: todo.data.author,
          dateCreated: todo.data.dateCreated,
          complete: todo.data.complete,
          id: todo.data.id,
        });
      }
    }, [todo]);
 
    return (
        <form
        onSubmit={(e) => {
            e.preventDefault(); 
            createTodo({title, content, author: user, 
              dateCreated: Date.now().toString(), complete: false});
        }}
        >
        <div>
          Author: <b>{user}</b>
        </div>
        <div>
          {error && (
            <div><span style={{ color: "red" }}>Fail to create Todo</span></div>
          )}
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
