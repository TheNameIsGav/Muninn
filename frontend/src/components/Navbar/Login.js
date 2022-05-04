import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <>
            <div>
                <input type="text" placeholder='username'/>
                <input type="text" placeholder='password'/>
                <button> Login </button>
            </div>
            </>
           
        );
    }
}

export default Login
