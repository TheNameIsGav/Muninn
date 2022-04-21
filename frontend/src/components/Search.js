import React from 'react';
import './Search.css'


function getValue() {
    console.log('hello world');
}



export const SearchBar = () => {
    return(
        <React.Fragment>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            <form class="example" action="action_page.php">
            <input type="text" name="search"/>
            <button type="submit"><i class="fa fa-search"></i></button>
            </form>
            
            
            {/* <form action="">
                <div>
                    <div className="search-bar">
                        <input type="text"/>
                    </div>
                </div>
            </form> */}
        </React.Fragment>
    )
}

