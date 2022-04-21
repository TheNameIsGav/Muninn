import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems'
import './Navbar.css'

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <div>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <input type="text" />
                    <button> Submit </button>
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