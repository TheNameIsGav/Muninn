import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'

function LoginForm(props) {

    let navigate = useNavigate();
    const [details, setDetails] = useState({ name: "", password: "", email: ""})

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
                if(text === "Username not found"){
                    alert("Username not found")
                } else if(text === "Password mismatch") {
                    alert("Password mismatch")
                } else {
                    fetchUserAccount(e, text)
                }
        })
    }

    const fetchUserAccount = (e, incText) => {
        e.preventDefault()

        var modText = incText.substring(1, incText.length-1)


        fetch('/api/display_user/' + modText).then(
            res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text)
                    navigate('/profile', {replace: true, state:{userVal}})
                } catch (error) {
                    
                }
            }
        )
        
    }

    const accountCreation = (e) => {
        navigate('/', {replace: true})
    }

    return(
        <>
        <div id='buttons'>
            <button id='login' onClick={accountCreation}>Create Account</button>
        </div>
        <div className='form'>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2> Login </h2>
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
        </>
    )
}

export default LoginForm;