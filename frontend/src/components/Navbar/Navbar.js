// /* eslint-disable */
import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems'
import './Navbar.css'
import './GameDisplay.css'

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
                this.setState({ gameInfo: data})
            })
            .catch(() => {
                alert("game not found");
            });
    }

    render() {
        return(
            <>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <form action="" className="example">
                        <div className='searchbar'>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input type="text" onChange={ this.getValue } name="search" />
                            <button onClick={ this.handleSubmit } id="demo"><i className="fa fa-search"></i></button>
                        </div>
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
            <div className = "GameInformation">
                { this.state.gameInfo && this.state.gameInfo.map((game) => 
                    <>
                    <p>
                        <img src= {game.image} alt="game picture" id ="image"/>
                        <h3 id = "game_title">{game.title}</h3>
                        <h3 id = "game_id">{game._id}</h3>
                        <h3 id = "game_desc">{game.description}</h3>
                    </p>
                    </>
                )}
            </div>
            </>
        )
    }
}

export default Navbar