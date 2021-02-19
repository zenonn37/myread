import React from "react";
import { Link } from "react-router-dom";
import BookList from "./BooksList";
import * as BooksAPI from "../BooksAPI";

class Search extends React.Component {
  state = {
    search: "",
    query: false,
    userInput: "",
    rawData: "",
  };

  /**
   * @description Checks if user input is valid, if not resets current state and ends function
   * @description If input is valid set userInput and call  searchBooksQuery when state is updated
   * @param {string} event - User input value from search field
   * @returns {void} returns nothing
   */

  searchBooks = (e) => {
    e.preventDefault();

    const input = e.target.value;
    if (input === "") {
      this.setState(() => ({
        search: "",
        query: false,
        userInput: "",
      }));

      return;
    }

    this.setState({ userInput: e.target.value }, () =>
      this.searchBooksQuery(this.state.userInput)
    );
  };
  /**
   * @description Search through raw book data,check for current book shelf matches and add shelf attribute to book object
   *  @description Combine Book state with raw search data, and filter out duplicates.
   *  @description Set search state to new array data
   * @param {string} query - User input from userInput state
   * @returns {void} returns nothing
   */
  searchBooksQuery = (query) => {
    BooksAPI.search(query).then((data) => {
      //handle query errors
      if (data.error === "undefined" || data.error === "empty query") {
        //set query guard to false
        this.setState(() => ({
          search: [],
          query: false,
        }));
        return;
      }

      //run through books and check for id matches
      //if you find a match from user shelf and search
      //append shelf attribute with current value ie-read|current|want
      //if no match is found append shelf:none

      const bkShelf = this.props.books;

      let shelf = [];
      //run through all search data and match any shelf data.
      //if there is a match push to shelf array.
      data.forEach((search) => {
        let match = bkShelf.find((shelf) => {
          return shelf.id === search.id;
        });
        if (match != null) shelf.push(match);
      });

      //adds shelf attribute to raw data temp array
      const sFinal = data.map((e) => ({
        ...e,
        shelf: "none",
      }));
      this.setState(() => ({
        rawData: sFinal,
      }));
      //combine two shelf and updated search results
      const appendShelf = [...shelf, ...sFinal];

      //filter out all duplicates using Array SET
      const view = Array.from(new Set(appendShelf.map((a) => a.id))).map(
        (id) => {
          return appendShelf.find((a) => a.id === id);
        }
      );
      //set new state form new array
      //set query guard to true
      if (this.state.userInput === query) {
        this.setState(() => ({
          search: view,
          query: true,
        }));
      }
    });
  };

  /**
   *
   ** @description Updates books shelf status of books, filter out books status set to none
   @description Addes new book to book shelf and updates search state
   * @param {string} shelf - Status of book
   * @param {object} book - Entire Book Object
    * @returns {void} returns nothing
   */
  shelfHandler = (shelf, book) => {
    //do not allow the none option to be passed to update call
    if (shelf === "none") return;

    //update books on current shelf
    const bks = this.props.books.find((bk) => bk.id === book.id);

    if (bks) {
      this.updateSearch(book, shelf)
        .then(() => {
          this.props.shelfHandlerMain(shelf, book);
        })
        .catch(() => {
          alert("Server Error please try again.");
        });
    } else {
      this.updateSearch(book, shelf)
        .then(() => {
          this.props.addNewBook({ ...book, shelf });
        })
        .catch(() => {
          alert("Server Error please try again.");
        });
    }

    // add books to shelf from search
  };
  updateSearch = (book, shelf) => {
    return new Promise((resolve, reject) => {
      BooksAPI.update(book, shelf)
        .then((data) => {
          const update = this.state.search.map((b) =>
            b.id === book.id ? Object.assign({}, b, { shelf: shelf }) : b
          );

          this.setState(() => ({
            search: update,
          }));
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  };

  render() {
    const { search, query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/* Search input uncontrolled, onchange calls search books every keystroke*/}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.searchBooks(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {/* 
             Check query status, then map over search results. If query is false
             simply return no data.
            
            */}
          <ol className="books-grid">
            {query ? (
              search.map((search) => (
                <BookList
                  books={search}
                  key={search.id}
                  shelfHandler={this.shelfHandler}
                />
              ))
            ) : (
              <div>No data enter a book or author.</div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
