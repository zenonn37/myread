import React from 'react';
import { Link } from "react-router-dom";



const  Header = () => {

    return(
        <>
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <ul>
            <li>
              <Link to="/search">
                Search
                </Link>
            </li>
          </ul>
        </div>
        </div>
    </>
  );

};

export default Header;