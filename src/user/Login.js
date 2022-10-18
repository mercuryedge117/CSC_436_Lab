import { useState } from "react"

function Login( { dispatch } ) {
    const [ username, setUsername ] = useState('');
    
    // function handleUsername (evt) { setUsername(evt.target.value) };

    return (
        <form onSubmit={e => {
            e.preventDefault(); 
            dispatch({ type: "LOGIN", username });
            }}>
            <label htmlFor="login-username">Username:</label>
            <input 
                type="text" 
                value={username} 
                onChange={(event) => setUsername(event.target.value)}
                name="login-username" 
                id="login-username" />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" />
            <input type="submit" value="Login" disabled={username.length === 0} />
        </form>
    )
}

export default Login;