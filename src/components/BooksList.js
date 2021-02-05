import React from 'react'
import SelectComp from './Select'


const BookList = ({books,shelfHandler}) => {

    const {title, authors,imageLinks,shelf,id} = books
    
     return(
  
        
                    <li>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                <SelectComp shelf={shelf} book={books} shelfHandler={shelfHandler} />
                                </div>
                            </div>
                            <div className="book-title">{title}</div>
                            <div className="book-authors">
                                {authors.map((author) =>(
                                    <span key={author}>{author}</span>
                                ))}
                            </div>
                        </div>
                    </li>
  
  );


}

export default BookList