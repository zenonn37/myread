import React from 'react'
import SelectComp from './Select'
import { motion } from "framer-motion"


const BookList = ({books,shelfHandler}) => {

    const {title, authors,imageLinks,shelf} = books;
    
   return(
  
        
                    <motion.li   
                    whileHover={{ scale: 1.2 }}>
                        <div className="book">
                            <div className="book-top">
                                {imageLinks ?  (
                                     <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                                ):(
                                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(book.png)` }}></div>
                                )
                           
                             
                                
                                }
                                <div className="book-shelf-changer">
                                <SelectComp shelf={shelf} book={books} shelfHandler={shelfHandler} />
                                </div>
                            </div>
                            <div className="book-title">{title}</div>
                            <div className="book-authors">
                                {authors && authors.map((author) =>(
                                    <span key={author}>{author}</span>
                                ))}
                            </div>
                        </div>
                    </motion.li>
  
  );


}

export default BookList