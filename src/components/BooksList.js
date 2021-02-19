import React from "react";
import SelectComp from "./Select";
import { motion } from "framer-motion";

const BookList = ({ books, shelfHandler }) => {
  const { title, authors, imageLinks, shelf } = books;

  return (
    <motion.li whileHover={{ scale: 1.1 }}>
      <div className="book">
        <div className="book-top">
          {/* 
            Check for images and render them, if no images exist
            render empty book cover.
          */}
          {imageLinks ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${imageLinks.thumbnail})`,
              }}
            />
          ) : (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(book.png)`,
              }}
            />
          )}
          <div className="book-shelf-changer">
            {/* Select to change status of a book Instance*/}
            <SelectComp
              shelf={shelf}
              book={books}
              shelfHandler={shelfHandler}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {/* Search input uncontrolled, onchange calls search books every keystroke*/}
          {authors ? (
            authors.map((author) => <div key={author}>{author}</div>)
          ) : (
            <span>No authors found.</span>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default BookList;
