import React , { useEffect, useState } from 'react';
import { MenuItems } from './MenuItems'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import './DisplayGame.css'

function Navbar() {

    const location = useLocation();    

    const [id, setID] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [platforms, setPlatforms] = useState([])
    const [rating, setRating] = useState(0)
    const [tags, setTags] = useState([])
    const [title, setTitle] = useState("")
    const [publisher, setPublisher] = useState("")

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setGame(location.state.game)
    })
    
    const setGame = (incGame) => {

        setID(incGame._id)
        setDescription(incGame.description)
        setImage(incGame.image)
        setPlatforms(incGame.platforms)
        setRating(incGame.rating)
        setTags(incGame.tags)
        setTitle(incGame.title)
        setPublisher(incGame.publisher)

        location.state.game = incGame

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = searchTerm;

        console.log("this is the value on submit: ", value);
        searchItem(event);
        
    }

    const searchItem = (e) => {
        e.preventDefault();
        console.log("Search for item after enter works")

        fetch('/api/search_game/' + searchTerm).then(res => res.text())
            .then(text => {
            try {
                var val = JSON.parse(text);
                setGame(val)
            } catch (e) {
                alert("That game appears to not exist")
            }

        });
    }

    return(
        <>
        <div>
            <div className='NavbarItems'>
                <img className='navbar-logo' alt= "our Logo" src = "muninnLogo.png"/>
                <form action="" className="example">
                    <div className='searchbar'>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <input type="text" onChange={ e => setSearchTerm(e.target.value) } name="search" />
                        <button onClick={ e => handleSubmit(e) } id="demo"><i className="fa fa-search"></i></button>
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
        <div className = "GameInformation">
            <>
            <nav>
                <button className='button big-btn'> Add to Wishlist</button>
                <button className='button big-btn'> Add to Library </button>
            </nav>
            <img src= {image} id="image" className="image"/>
            <p id = "game_title" className="gameTitle">{title}</p>
            <p id = "game_id" className="gameID">{id}</p>
            <p id = "rating" className="ratingGame">{rating}/5</p>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            <p id = "game_desc">{description}</p>
            <p id="tags" className="tagTitle">TAGS: {tags && tags.map((tag, i) => 
                <>
                    <button key={i} className="button medium-btn">{tag}</button>
                </>
            )}</p>
            <div className="boxed">Publisher: {publisher} <br></br> Platform: {platforms} </div>
            {/* <div className="boxed"> </div> */}
            </>
        </div>
        </>
    )
    
}

export default Navbar