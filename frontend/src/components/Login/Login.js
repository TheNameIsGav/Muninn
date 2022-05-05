import React, { useState } from 'react';
import './Login.css'

function LoginForm({ Login, error}) {
    const [details, setDetails] = useState({ name: "", email: "", password: ""})

    const submitHandler = e => {
        e.preventDefault();
        console.log("this is detail.name: ", details.name);

        Login(details)

        fetch('http://localhost:8000/login', {
            method: 'POST',
            body: { username: details.name, email: details.email, password: details.password },
        }).then(() => {
            console.log("user checked")
        })

    }

    return(
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2> Login </h2>
                {(error !=="") ? ( <div className="error">{error}</div>): ""}
                <div className="form-group">
                    <input type="text" placeholder="Username" name="name" id="name"  onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    )
}

export default LoginForm;