import React, { Component } from 'react'
import LoginModal from 'react-login-modal'

class LoginButton extends Component {

    state = {
        isOpen: false,
        buttonOpen: true,
        logOut: false,
    }

    openLogin = () => {
        this.setState({ isOpen: true});
    }

    closeLogin = () => {
        this.setState({ isOpen: false});
    }

    changeButton = () => {
        this.setState({ buttonOpen: true });
        this.setState({ logOut: false });
    }

    handleSignup = (username, email, password) => {
        fetch("http://localhost:8000/add_user")
            .then(() => {this.setState({isOpen: false})})
    };

    handleLogin = (username, password) => {
        fetch("http://localhost:8000/login")
            .then(() => {this.setState({isOpen: false})})
            .then(() => {this.setState({buttonOpen: false})})
            .then(() => {this.setState({logOut: true})})
    };

  render() {
    //ternary operator approach for conditional rendering
    return(
        <>
        {this.state.buttonOpen ? <button onClick={this.openLogin}>Log In</button> : null}
        {this.state.logOut ? <button onClick={this.changeButton}>Log Out</button> : null}
        {this.state.isOpen ? <LoginModal handleLogin={this.handleLogin} handleSignup={this.handleSignup}/> : null}
        </>
    )
  }
}

export default LoginButton