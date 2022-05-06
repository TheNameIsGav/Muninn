import React, {Component} from 'react';
import { MenuItems } from './MenuItems'
import './Navbar.css'
import './DisplayGame.css'
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
            image: "",
            tags: [], 
            rating: 0,
        },
        isOpen: false,
    }
    getValue = (event) => {
        this.setState({ value: event.target.value })

        console.log("event: ", event.target.value);
    }

    componentDidMount() {
        this.state.value = "Doom";
        this.searchItem()
    }

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
                </div>
            </div>
            {this.state.isOpen ? <LoginModal handleLogin={this.handleLogin}/> : null}
            <div className = "GameInformation">
                <>
                <nav>
                    <button className='button big-btn'> Add to Wishlist</button>
                    <button className='button big-btn'> Add to Library </button>
                </nav>
                <img src= {this.state.gameInfo.image} id="image" className="image"/>
                <p id = "game_title" className="gameTitle">{this.state.gameInfo.title}</p>
                <p id = "game_id" className="gameID">{this.state.gameInfo._id}</p>
                <p id = "rating" className="ratingGame">{this.state.gameInfo.rating}/5</p>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                <p id="tags" className="tagTitle">TAGS: {this.state.gameInfo.tags && this.state.gameInfo.tags.map((tag, i) => 
                    <>
                        <button key={i} className="button medium-btn">{tag}</button>
                    </>
                )}</p>
                <p id = "game_desc">{this.state.gameInfo.description}</p>
                </>
            </div>
            </>
        )
    }
}

export default Navbar