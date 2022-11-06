export default function Todo ({ title, content, author, dateCreated, complete, dateCompleted }) {

    return (
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
            <br />
            <i>Create by <b>{author}</b> at <b>{dateCreated}</b></i>
            <br />
            <label>Complete? <b>{complete ? "Yes" : "No"}</b></label>
            <br />
            {complete === true && <i> Complete Date: <b>{dateCompleted}</b></i>}
        </div>
    )
}
