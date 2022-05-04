import React, {useEffect, Component} from 'react';
import axios from 'axios';

class Browse_Games extends React.Component {

    state = {
        gameInfo: [],
    }

   componentDidMount= () => {
        fetch('http://localhost:8000/browse_games')
            .then(response => response.json())
            .then(data => {
                this.setState({ gameInfo: data})
             })
            .catch(()=> {
                alert("no games found");
            })
        
        }
    render() {
        return (
            <div> className="Browse_Games yayay" 
                This is the page to browse games
            </div>
        )
    }
}

export default Browse_Games;