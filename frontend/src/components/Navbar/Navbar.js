import React, {Component} from 'react';
import { Button } from '../Button';
import Searchbar from '../Searchbar/Searchbar';
import { MenuItems } from './MenuItems'
import './Navbar.css'
import './GameDisplay.css'
import './Button.css'
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

class Navbar extends Component {
    render() {
        return(
            <>
            <Router>
                <div className='NavbarItems'>
                    <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                    <Searchbar></Searchbar>
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