import React from 'react';



const  Header = ({books}) => {
         const bookCount = books.length
    return(
        <>
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <h3>
          Current Book Shelf : {bookCount}
        </h3>
        
        </div>
      
        </div>
    </>
  );

};

export default Header;