import React from 'react';
import BookList from './BooksList';



const Books = ({status,books,shelfHandler}) => {

    const shelfStatus = shelf =>{
        let sts;
        switch (shelf) {
            case 'currentlyReading':
                sts = 'Currently Reading'
                break;

            case 'wantToRead':
                sts = 'Want To Read'
                break;
            case 'read':
                sts = 'Read'
                break;
        
            default:
                sts ='None'
                break;
        }
        return sts;
    }

    const currentShelf =   books.filter((b) => b.shelf === status)
    const booksAmount = currentShelf.length; 

      
    return(

    
    
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {shelfStatus(status) + ' ' +booksAmount+ ' books'}
                </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                      
                      currentShelf.map((book) =>(
                            <BookList books={book} key={book.id} shelfHandler={shelfHandler}/>
                        ))
                    }
                   
             
                </ol>
            </div>
        </div>
    );
};

export default Books;