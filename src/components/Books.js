import React from 'react'
import BookList from './BooksList';



const Books = ({status,books,shelfHandler}) => {

      
    return(

    
    
        <div className="bookshelf">
            <h2 className="bookshelf-title">{status}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                        books.filter((b) => b.shelf === status)
                        .map((book) =>(
                            <BookList books={book} key={book.id} shelfHandler={shelfHandler}/>
                        ))
                    }
                   
             
                </ol>
            </div>
        </div>
    );
                }

export default Books;