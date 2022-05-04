import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';


function Login() {

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({name:"", email:""});
    const [error, setError] = useState("");

    return(
        <div>
            <input type="text" placeholder='username'/>
            <input type="text" placeholder='password'/>
            <button> Login</button>
        </div>
    )
}

export default Login;