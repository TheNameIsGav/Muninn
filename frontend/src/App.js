import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Login/Login';
import './App.css'

function App(){

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({name:"", email:""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        // let searchUser = {username: this.setState(details.name)}

        // postUserLoginConfig = {
        //     url: 'http://localhost:8000/login',
        //     username: searchUser
        // }

        // postSuccessHandler = function (err, httpResponse, body) {
        //     console.log('JSON response from the server: ' + body)
        // }

        if(details.email === adminUser.email && details.password === adminUser.password){
            console.log("logged in")
            setUser({
                name: details.name, 
                email: details.email
            });
        } else {
            setError("Details do not match!")
        }
            
    }

    const Logout = () => {
        setUser({name:"", email:""})
    }

    return(
        <>
        <Navbar/>
        <div className='App'>
            {(user.email !== "")? (
                <div className="welcome">
                    <h2> Welcome <span>{user.name}</span></h2>
                    <button onClick={Logout}> Logout </button>
                </div>
            ):(
                <LoginForm Login={Login} error={error}/>
            )}
        </div>
        </>
    );
}

export default App