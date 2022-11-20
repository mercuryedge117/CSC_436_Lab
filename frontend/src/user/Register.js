import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";

import { StateContext } from "../contexts";

export default function Register() {
    const { dispatch } = useContext(StateContext);
    const [ formData, setFormData ] = useState({
        username: "",
        password: "", 
        passwordRepeat: "",
    })

    const [status, setStatus] = useState("");
    const [user, register] = useResource((username, password) => ({
        url: "auth/register",
        method: "post",
        data: { username, password },
      }));
    
    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
              setStatus("Registration failed, please try again later.");
            } else {
              setStatus("Registrtion successful.");
              dispatch({ 
                type: "REGISTER", 
                username: user.data.username,
                access_token: user.data.access_token,
              });
            }
        }
    }, [user]);
 
    return (
    <form onSubmit={(e) => { 
        e.preventDefault(); 
        // dispatch({ type: "REGISTER", formData });
        register(formData.username, formData.password);
        }}>
        <label htmlFor="register-username">Username:</label>
        <input 
            type="text" 
            value={ formData.username } 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
            name="register-username" 
            id="register-username" 
            />
        <label htmlFor="register-password">Password:</label>
        <input 
            type="password" 
            value={ formData.password } 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            name="register-password" 
            id="register-password" 
            />
        <label htmlFor="register-password-repeat">Repeat password:</label>
        <input 
            type="password" 
            value={ formData.passwordRepeat } 
            onChange={(e) => setFormData({...formData, passwordRepeat : e.target.value})} 
            name="register-password-repeat" 
            id="register-password-repeat" 
            />
        <input 
            type="submit" 
            value="Register" 
            disabled={ 
                formData.username.length === 0 || 
                formData.password.length === 0 || 
                formData.password !== formData.passwordRepeat 
                } 
            />
        <p>{status}</p>
    </form>
    )
}
