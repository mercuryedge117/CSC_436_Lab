import { useState } from 'react'

export default function Todo ({ title, description, author, dateCreated, dateCompleted}) {
    const [ complete, setCompletion ] = useState(false);
    
    if (complete === true) {dateCompleted = Date.now();}

    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Create by <b>{author}</b> at {dateCreated}</i>
            <br />
            <label htmlFor="complete-check">Complete? {complete.toString()}</label>
            <input type="checkbox" name="complete-check" onChange={(event) => setCompletion(event.target.checked)} />
            {complete === true && <i>Complete Date: {dateCompleted}</i>}
        </div>
    )
}
