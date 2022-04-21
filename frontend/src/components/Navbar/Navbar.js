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
            <React.Fragment>
            <div className='NavbarItems'>
                {/* <h1 className='logo-name'> Muninn </h1> */}
                <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <React.Fragment>
                            <li key={index}>
                                <a className={item.cName} href={item.url}> {item.title} </a>
                            </li>
                            </React.Fragment>
                        )
                        
                    })}
                </ul>
                <Button>Sign Up</Button>
            </div>
        </React.Fragment>


            // <nav className='NavbarItems'>
            //     <h1 className='logo-name'> Muninn</h1>
            //         <img className='navbar-logo' src = "muninnLogo.png"/>
            //     <div className="menu-icon" onClick={this.handleClick}> 
            //         <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'} ></i>
            //     </div>
            //     <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
            //         {MenuItems.map((item, index) => {
            //             return (
            //                 <li key={index}>
            //                     <a className={item.cName} href={item.url}>
            //                     {item.title}
            //                     </a>
            //                 </li>
            //             )
            //         })}
            //     </ul>
            //     <Button>Sign Up</Button>
            // </nav>
        )
    }
}

export default Navbar