import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { MenuItems } from './MenuItems'
import './Navbar.css'
import './GameDisplay.css'
import './Button.css'
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

class Navbar extends Component {

    state = {
        value: '',
    }
    backendData = ('');
    setBackendData = ('')

    getValue = (event) => {
        this.setState({ value: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;
        console.log("value on submit: ", value);
    }

    componentDidMount = () => {
        console.log("submit on click component did mount works")
        const firstValue = 'http://localhost:8000/search_game/'
        let searchedTerm = this.state.value
        let fullURL = firstValue.concat(searchedTerm)
        fetch(fullURL).then(
            response => response.json()
        ).then(
            data => {
                this.setBackendData.concat(data)
            }
        )
        console.log("this is the setBackendData: ", this.setBackendData)
    }

    render() {
        return(
            <>
            <Router>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <form action="">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input type="text" onChange={ this.getValue } />
                            <button onClick={ this.randomThing }><i class="fa fa-search"></i></button>
                    </form>
                        {MenuItems.map((item, index) => {
                            return (
                                <>
                                <li key={index}>
                                    <a className={item.cName} href={item.url}> {item.title} </a>
                                </li>
                                </>
                            )
                        })}

                            <Link to="/Profile"> Profile </Link>
                            <Link to="/Login"> Login </Link>
                        {/* <button className="button" onClick={this.Login}> click me</button>
                        <button className="button"> me too</button> */}
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
            <Switch>
                <Route path='/Profile' component={Profile}/>
                <Route path='/Login' component={Login}/>
                <Route>
                    <h1>not found</h1>
                </Route>
            </Switch>
            </Router>
            </>
        )
    }
}

export default Navbar