import React, { useState } from 'react';
import './Login.css'

function LoginForm({ Login, error, id}) {
    const [details, setDetails] = useState({ name: "", password: "", email: ""})
    const [loginId, setLoginDetails] = useState({id: 0});

    const submitHandler = e => {
        e.preventDefault();

        var postData = { username: details.name, password: details.password, email: details.email}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };

        fetch('/api/login', requestOptions).then(
            res => res.text()).then(text => {
                console.log(text)
                if(text === "Username not found"){
                    alert("Username not found")
                } else if(text === "Password mismatch") {
                    alert("Password mismatch")
                } else {
                    console.log(details.name)
                    console.log(details.email)

                    setDetails({
                        name: postData.username, 
                        email: postData.email
                    });
                    setLoginDetails({
                        id: text
                    })
                    return(
                        <div className='App'>
                            <div className="welcome">
                                <h2> Welcome <span>{details.name}</span></h2>
                                {/* <button onClick={Logout}> Logout </button> */}
                            </div>
                        </div>
                    )
                }
        })
    }

    return(
        <div className='form'>
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
        </div>
    )
}

export default LoginForm;