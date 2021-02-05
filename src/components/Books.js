import React from 'react'
import BookList from './BooksList';



const Books = ({shelf,books,shelfHandler}) => (
    
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) =>(
                        
                       <BookList books={book} key={book.id} shelfHandler={shelfHandler}/>
                    ))}
             
                </ol>
            </div>
        </div>
    
)

export default Books;