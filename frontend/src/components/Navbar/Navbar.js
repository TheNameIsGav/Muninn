// /* eslint-disable */
import React, {Component} from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems'
import './Navbar.css'
import LoginModal from 'react-login-modal'

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.searchItem = this.searchItem.bind(this)
    }

    state = {
        gameInfo: {
            _id: 0,
            title: "",
            description: "",
            tags: []
        },
        isOpen: false,
    }

    // openLogin = () => {
    //     this.setState({isOpen: true});
    // }

    // closeLogin = () => {
    //     this.setState({isOpen: false});
    // }

    // handleSignup = (username, email, password) => {};
    // handleLogin = (username, password) => {};

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
        this.searchItem();
    }

    searchItem = () => {
        console.log("Search for item after enter works")

        fetch('/api/search_game/' + this.state.value).then(res => res.text())
            .then(text => {
            try {
                var game = JSON.parse(text);
                this.setState({gameInfo: game})
            } catch (e) {
                console.log("error")
            }
        });
    }

    componentDidMount = () => {
        
    }

    render() {
        return(
            <>
            <div>
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
                    {/* <Button>Sign Up</Button>
                    <Button onClick={this.openLogin}>Log In</Button> */}
                </div>
            </div>
            {this.state.isOpen ? <LoginModal handleLogin={this.handleLogin}/> : null}
            <div className = "GameInformation">
                <>
                <p id = "game_id">{this.state.gameInfo._id}</p>
                <p id = "game_title">{this.state.gameInfo.title}</p>
                <p id = "game_desc">{this.state.gameInfo.description}</p>
                </>
            </div>
            </>
        )
    }
}

export default Navbar