import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar';
import LoginButton from './components/Login/LoginButton';
import Profile from './components/Profile/Profile';

class App extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           isLoggedIn: false
        }
    }

    render() {
        return(
            this.state.isLoggedIn ? 
            <>
                <Navbar/>
                <Profile/>
            </> : 
            <>
                <Navbar/>
                <LoginButton/>
            </>
        )
    }
}

export default App;