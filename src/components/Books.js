import React from "react";
import BookList from "./BooksList";

const Books = ({ status, books, shelfHandler }) => {
  /**
   * @description Simply converts the status constant from props and formats to correct titles
   * @param {string} shelf - takes in a constant from props
   * @returns {string} returns a string
   */
  const shelfStatus = (shelf) => {
    let sts;
    switch (shelf) {
      case "currentlyReading":
        sts = "Currently Reading";
        break;

      case "wantToRead":
        sts = "Want To Read";
        break;
      case "read":
        sts = "Read";
        break;

      default:
        sts = "None";
        break;
    }
    return sts;
  };
  //filter books already on user shelf
  const currentShelf = books.filter((b) => b.shelf === status);
  const booksAmount = currentShelf.length;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {/* Shows correct titles and number of boooks on current instance */}
        {shelfStatus(status) + " " + booksAmount + " books"}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* Renders all books on current shelf instance */}
          {currentShelf.map((book) => (
            <BookList books={book} key={book.id} shelfHandler={shelfHandler} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Books;
