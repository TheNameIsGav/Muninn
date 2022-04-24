import React from 'react';


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
            <form action="">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <input type="text" onChange={ this.getValue } />
                <button onClick={ this.handleSubmit }><i class="fa fa-search"></i></button>
            </form>
        )
    }
}

export default Searchbar