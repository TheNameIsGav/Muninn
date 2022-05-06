import React, { Component } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './accCreate.css'

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this)
    }

    state = {
        username: "",
        email: "",
        password: "",
        passwordVerify: "",
        hasSubmitted: false,
        redirect: null
    }

    submitHandler = (e) => {
        e.preventDefault();

        if(this.state.password !== this.state.passwordVerify){
            alert("Passwords do not match");
            this.setState({password : ""})
            this.setState({passwordVerify: ""})
            return;
        }

        var postData = this.state
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
                    alert("Account created successfully!")
                    this.setState({hasSubmitted: true});
                    this.setState({redirect: '/about'})
                }
            }
        )
    }

    render() {
        if(this.state.redirect) {
            console.log("Navigating")
            Navigate(this.state.redirect)
        }
        return (                    
            <div className='form'>
                <form onSubmit={this.submitHandler}>
                    <div className="form-inner">
                        <h2> Create Account </h2>
                        <div className="form-group">
                            <input type="text" placeholder="Username" name="name" id="name"  value={this.state.username} onChange={evt => {this.setState({username: evt.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name="email" id="email" value={this.state.email} onChange={evt => {this.setState({email: evt.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" name="password" id="password" value={this.state.password} onChange={evt => {this.setState({password: evt.target.value})}}/>
                        </div>
                        <div className='form-group'>
                            <input type="password" placeholder='Verify Password' name='password' id='password' value={this.state.passwordVerify} onChange={evt => {this.setState({passwordVerify: evt.target.value})}}/>
                        </div>
                        <input type="submit" value="CREATE ACCOUNT"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateAccount