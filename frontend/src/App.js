import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar";
import Browse_Games from './components/Browse_Games/Browse_Games';
import './App.css';


class App extends Component{
  
  render(){
    return (  
    <div className="App"> 
        <Navbar/>
        <Router>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact to="/browse_games"
                  activeClassName="selected">
                  Browse_Games
                </NavLink>
              </li>
            </ul>
          </nav>
  
          <Switch>
            <Route path="/browse_games">
              <Browse_Games />
            </Route>
          </Switch>
        </Router>
        
      </div>
    );
  }
}


export default App;
