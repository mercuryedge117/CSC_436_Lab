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
        url: "auth/login",
        method: "post",
        data: { username, password },
    }));

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
              setLoginFailed(true);
            } else {
              setLoginFailed(false);
              dispatch({
                type: "LOGIN",
                username: user.data.username,
                access_token: user.data.access_token,
              });
            }
        }
    }, [user]);
    

    return (
        <>
            {loginFailed && (
            <span style={{ color: "red" }}>Login error: Invalid username or password</span>
            )}
            <form onSubmit={(e) => {
                e.preventDefault(); 
                login(username, password);
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