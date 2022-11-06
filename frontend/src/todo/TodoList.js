import { useContext } from "react";

import Todo from "./Todo";
import { StateContext } from '../contexts';

import { useResource } from 'react-request-hook';

export default function TodoList () {

    const { state, dispatch } = useContext(StateContext);
    const { todos } = state;

    const [ todoDelete, deleteTodo ] = useResource(({ id }) => ({
        url: `/todos/${id}`,
        method: 'delete'
        }));

    const [ todoPatch, patchTodo ] = useResource(({ id, complete, dateCompleted }) => ({
        url: `/todos/${id}`,
        method: 'patch',
        data: {complete, dateCompleted}
        }));

    return (
        <div>
            {todos.map((p) => 
            <div key={p.id} >
            <Todo {...p}/>
            <small>Check when Completed: </small>
            <input type="checkbox" name="complete-check" checked={p.complete}
                onChange={
                    (event) => {
                        patchTodo({id: p.id, complete: event.target.checked, dateCompleted: Date.now().toString()})
                        dispatch({ 
                            type: "TOGGLE_TODO", 
                            id: p.id, 
                            checked: event.target.checked,
                            dateComp: Date.now().toString(),
                        });
                    }} />
            <br />
            <input 
                type="button" 
                name="Delete" 
                value="Delete"
                onClick={() => {
                    deleteTodo({id: p.id});
                    dispatch({ type: "DELETE_TODO", id: p.id});}
                    } />
            </div>
            )}
        </div>
    );
}