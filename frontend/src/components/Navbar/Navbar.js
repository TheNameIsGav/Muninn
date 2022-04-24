import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems'
import './Navbar.css'

class Navbar extends Component {

    state = {
        value: ''
    }

    getValue = (event) => {
        this.setState({ value: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;
        console.log("value on submit: ", value);
    }

    render() {
        return(
            <div>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <form action="">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input type="text" onChange={ this.getValue } />
                            <button onClick={ this.handleSubmit }><i class="fa fa-search"></i></button>
                    </form>
                        {MenuItems.map((item, index) => {
                            return (
                                <React.Fragment>
                                <li key={index}>
                                    <a className={item.cName} href={item.url}> {item.title} </a>
                                </li>
                                </React.Fragment>
                            )
                        })}
                    <Button>Sign Up</Button>
                    <Button>Login</Button>
                </div>
            </div>
        )
    }
}

export default Navbar