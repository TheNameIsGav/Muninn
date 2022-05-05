import React, { useState } from 'react';
import './Login.css'

function LoginForm({ Login, error, id}) {
    const [details, setDetails] = useState({ name: "", password: "", email: ""})
    const loginId = 0;

    const submitHandler = e => {
        e.preventDefault();

        Login(details)

        var postData = { username: details.name, password: details.password, email: details.email}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        fetch('/api/login', requestOptions).then(
            res => res.text()).then(text => {
                if(text === "Username not found"){
                    //INvalid user
                } else if(text === "Password mismatch") {
                    //invalid user
                } else {
                    //valid user
                }
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