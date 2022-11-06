import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";

import { StateContext } from "../contexts";

function Login() {
    const { dispatch } = useContext(StateContext);
    
    const [ username, setUsername ] = useState('');
    const [ loginFailed, setLoginFailed ] = useState(false);
    const [ password, setPassword ] = useState("");
    
    function handleUsername (evt) {
        setUsername(evt.target.value) };

    function handlePassword (evt) {
        setPassword(evt.target.value);
    }

    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "post",
        data: { email: username, password },
    }));

    useEffect(() => {
        if (user?.data?.user) {
          setLoginFailed(false);
          dispatch({ type: "LOGIN", username: user.data.user.email });
        }
    
        if (user?.error) {
          console.log(user?.error);
          setLoginFailed(true);
        }
    }, [user]);
    

    return (
        <>
            {loginFailed && (
            <span style={{ color: "red" }}>Invalid username or password</span>
            )}
            <form onSubmit={(e) => {
                e.preventDefault(); 
                login(username, password);
                // dispatch({ type: "LOGIN", username });
                }}>
                <label htmlFor="login-username">Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={handleUsername}
                    name="login-username" 
                    id="login-username" />
                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    name="login-password"
                    id="login-password" />
                <input type="submit" value="Login" disabled={username.length === 0} />
            </form>
        </>
    )
}

export default Login;