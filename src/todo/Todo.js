export default function Todo ({ title, content, author, dateCreated, complete, dateCompleted, id, dispatch}) {

    return (
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
            <br />
            <i>Create by <b>{author}</b> at {dateCreated}</i>
            <br />
            <label htmlFor="complete-check">Complete? {complete.toString()}</label>
            {/* <input type="checkbox" name="complete-check" onChange={(event) => {setCompletion(event.target.checked)}} /> */}
            <input type="checkbox" name="complete-check" onChange={
                (event) => {
                    dispatch({ 
                        type: "TOGGLE_TODO", 
                        id, 
                        status: event.target.checked});
                }} />
            {complete === true && <i>Complete Date: {dateCompleted}</i>}
            <br />
            <input 
                type="button" 
                name="Delete" 
                value="Delete"
                onClick={(e) => {dispatch({ type: "DELETE_TODO", id});}} />
        </div>
    )
}
