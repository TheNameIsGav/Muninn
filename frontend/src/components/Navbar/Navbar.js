// /* eslint-disable */
import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems'
import './Navbar.css'

class Navbar extends Component {

    state = {
        gameInfo: [],
    }

    //this is for the values within the searchbar
    getValue = (event) => {
        this.setState({ value: event.target.value })

        console.log("event: ", event.target.value);
    }


    //this is for the onClick of submit
    handleSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;

        console.log("this is the value on submit: ", value);
        this.componentDidMount();
    }


    componentDidMount = () => {
        console.log("submit on click component did mount works")
        const firstValue = 'http://localhost:8000/search_game/'
        let searchedTerm = this.state.value
        let fullURL = firstValue.concat(searchedTerm)
        fetch(fullURL)
            .then((res) => res.json())
            .then((data) => {
                const gameInfo = data;
                console.log("data: ", data);
                console.log("gameInfo: ", gameInfo);
            })
            .catch(() => {

            });
    }

    render() {
        return(
            <>
            <div>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <form action="">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input type="text" onChange={ this.getValue } />
                            <button onClick={ this.handleSubmit } id="demo"><i class="fa fa-search"></i></button>
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
            <div>
                {(this.state.gameInfo === 'undefined') ? (
                    <p> Loading....</p>
                ) : (
                this.state.gameInfo.map((gameInfo) => {
                    return(
                        <>
                        <p> ID: {gameInfo._id}</p>
                        <p> title: {gameInfo.title}</p>
                        <p> description: {gameInfo.description}</p>
                        <p> publisher: {gameInfo.publisher}</p>
                        </>
                    );
                }))}
            </div>
            </>
        )
    }
}

export default Navbar