import React, { Component } from 'react'
import LoginModal from 'react-login-modal'

class LoginButton extends Component {

    state = {
        isOpen: false,
    }

    openLogin = () => {
        this.setState({ isOpen: true});
    }

    closeLogin = () => {
        this.setState({ isOpen: false});
    }

    handleSignup = (username, email, password) => {};
    handleLogin = (username, password) => {};

  render() {
    //ternary operator approach for conditional rendering
    return(
        <>
        <button onClick={this.openLogin}>Log In</button>
        {this.state.isOpen ? <LoginModal handleLogin={this.handleLogin}/> : null}
        </>
    )
  }
}

export default LoginButton