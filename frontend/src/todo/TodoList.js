import { useContext } from "react";

import Todo from "./Todo";
import { StateContext } from '../contexts';

import { useResource } from 'react-request-hook';

export default function TodoList () {

    const { state, dispatch } = useContext(StateContext);
    const { todos } = state;

    const [ todoDelete, deleteTodo ] = useResource(({ id }) => ({
        url: `/todo/${id}`,
        method: 'delete',
        headers: {Authorization: `${state?.user?.access_token}`},
        }));

    const [ todoPatch, patchTodo ] = useResource(({ id, complete, dateCompleted }) => ({
        url: `/todo/${id}`,
        method: 'patch',
        headers: {Authorization: `${state?.user?.access_token}`},
        data: {complete, dateCompleted}
        }));

    return (
        <div>
            {todos.length === 0 && <h2>No todos found.</h2>}
            {todos.length > 0 && todos.map((p) => 
            <div key={p._id} >
            <Todo {...p}/>
            <small>Check when Completed: </small>
            <input type="checkbox" name="complete-check" checked={p.complete}
                onChange={
                    (event) => {
                        const dateComp = ((event.target.checked) ? Date.now().toString() : "N/A");
                        patchTodo({id: p._id, complete: event.target.checked, dateCompleted: dateComp})
                        dispatch({ 
                            type: "TOGGLE_TODO", 
                            id: p._id, 
                            checked: event.target.checked,
                            dateComp: dateComp,
                        });
                    }} />
            <br />
            <input 
                type="button" 
                name="Delete" 
                value="Delete"
                onClick={() => {
                    deleteTodo({id: p._id});
                    dispatch({ type: "DELETE_TODO", id: p._id});}
                    } />
            </div>
            )}
        </div>
    );
}