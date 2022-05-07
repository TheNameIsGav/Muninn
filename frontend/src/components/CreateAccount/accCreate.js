import React , { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './accCreate.css'
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';

function CreateAccount() {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [userID, setUserID] = useLocalStorage("userID", "");


    let navigate = useNavigate();



    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== passwordVerify){
            alert("Passwords do not match");
            setPassword("")
            setPasswordVerify("");
            return;
        }

        var postData = {username: user, email: email, password: password}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        };


        fetch('/api/add_user', requestOptions).then(
            res => res.text()).then(text => {
                if(text.toLowerCase() === "found previously existing user"){
                    alert("Username or email already exists in the database, please login")
                    return;
                } else {
                    var modText = text.substring(1, text.length-1)
                    setUserID(modText)
                    continueRedirect(e, modText)
                }
            }
        )
    }

    const continueRedirect = (e, text) => {
        
        fetch('/api/display_user/' + text).then(
            res => res.text()).then(text => {
                try {

                    const userVal = JSON.parse(text)
                    console.log(userVal)
                    navigate('/profile', {replace: true, state:{userVal}})
                } catch (error) {
                    
                }
            }
        )
    }

    const loginRedirect = (e) => {
        navigate('/login', {replace: true})
    }

    return (                  
        <>
        <div id='buttons'>
            <button id='login' onClick={loginRedirect}>Login</button>
        </div>
        <div className='form'>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2> Create Account </h2>
                    <div className="form-group">
                        <input type="text" placeholder="Username" name="name" id="name"  value={user} onChange={evt => {setUser(evt.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={evt => {setEmail(evt.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" id="password" value={password} onChange={evt => {setPassword(evt.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder='Verify Password' name='password2' id='password2' value={passwordVerify} onChange={evt => {setPasswordVerify(evt.target.value)}}/>
                    </div>
                    <input type="submit" value="CREATE ACCOUNT"/>
                </div>
            </form>
        </div>
        </>  
    )
}

export default CreateAccount