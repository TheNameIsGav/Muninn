import React, {Component, useState} from 'react';
import { Button } from '../Button';
import Searchbar from '../Searchbar/Searchbar';
import { MenuItems } from './MenuItems'
import './Navbar.css'
// import axios from 'axios';

var request = require("request"); //needed for post request

let backendData;

let setBackendData;

class Navbar extends Component {

    state = {
        value: '',
        // title: []
    }
    backendData = []

    setBackendData = [];

    searchSection = 'http://localhost:8000/search_game'
    // fullSearch = this.searchSection.concat(this.state.value)


    getValue = (event) => {
        this.setState({ value: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;
        console.log("value on submit: ", value);
    }

    randomThing = (event) => {
        event.preventDefault();
        const firstValue = 'http://localhost:8000/search_game/'
        let searchedTerm = this.state.value
        let fullURL = firstValue.concat(searchedTerm)
        console.log("this is the fullSearch: ", fullURL);
        console.log("this is the submitted value: ", this.state.value)
        fetch(fullURL).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }

    render() {
        return(
            <div>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <form action="">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input type="text" onChange={ this.getValue } />
                            <button onClick={ this.randomThing }><i class="fa fa-search"></i></button>
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
                    <div>
                    {(typeof this.backendData.title === 'undefined') ? (
                            <p> Loading....</p>
                        ):(
                            this.backendData.title.map((title, index) => (
                                <p key={index}>{title}</p>
                            ))
                        )}
                    </div>
                    <Button>Sign Up</Button>
                    <Button>Login</Button>
                </div>
            </div>
        )
    }
}

export default Navbar