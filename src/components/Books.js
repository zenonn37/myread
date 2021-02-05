import React from 'react'
import BookList from './BooksList';



const Books = ({shelf}) => (
    
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                <BookList/>
                </ol>
            </div>
        </div>
    
)

export default Books;