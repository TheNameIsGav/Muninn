import React from 'react';
import './Searchbar.css'


class Searchbar extends React.Component {

    state = {
        value: ''
    }

    getValue = (event) => {
        this.setState({ value: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;
        console.log("value on submit: ", value);
    }

    render() 
    {
        return(
            <form action="" class="example">
            <div className='searchbar'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <input type="text" onChange={ this.getValue } name="search" />
                <button onClick={ this.handleSubmit }><i class="fa fa-search"></i></button>
            </div>
            </form>
        )
    }
}

export default Searchbar