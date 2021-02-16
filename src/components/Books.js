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

      
    return(

    
    
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {shelfStatus(status)}
                </h2>
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
};

export default Books;