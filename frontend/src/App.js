import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Login/Login';
import Searchbar from './components/Searchbar/Searchbar';

function App(){

    // const [user, setUser] = useState({name:"", email:""});
    // const [error, setError] = useState("");

    // const Login = details => {
    //     setUser({
    //         name: details.name, 
    //         email: details.email
    //     });
    // }

    // const Logout = () => {
    //     setUser({name:"", email:""})
    // }

    return(
        <>
        <Navbar/>
        {/* <Searchbar/> */}
        {/* <div className='App'>
            {(user.email !== "")? (
                <div className="welcome">
                    <h2> Welcome <span>{user.name}</span></h2>
                    <button onClick={Logout}> Logout </button>
                </div>
            ):(
                <LoginForm Login={Login} error={error}/>
            )}
        </div> */}
        </>
    );
}

export default App