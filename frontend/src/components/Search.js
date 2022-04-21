import React from 'react';
import './Search.css'


export const SearchBar = ({}) => {
    return(
        <React.Fragment>
            <div className="search-bar">
                <form action=''>
                    <div>
                        <label htmlFor=''>
                        <input type="text" placeholder="Search.." onChange={ this.getValue}/>
                    </label>
                    </div>
                
                </form>
            </div>
        </React.Fragment>
    )
}

