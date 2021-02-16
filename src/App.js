import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Books from './components/Books';
import Header from './components/Header';
import Search from './components/Search';
import { Route, Link } from "react-router-dom";


const SHELF_1 = "currentlyReading";
const SHELF_2 = "wantToRead";
const SHELF_3 = "read";



class BooksApp extends React.Component {

  state = {
    books:[],
   
  };

  //load server book shelf data
  componentDidMount(){
    this.loadAllData();
  };

  //book shelf api call function
  loadAllData = () => {
    BooksAPI.getAll()
    .then((data) =>{
         //set the state with results
         this.setState(() =>({
           books:data
         }));
     
       
    });
  };

  //handle indvidual book status
  shelfHandler = (shelf,book) =>{                  
       
          
        
     BooksAPI.update(book,shelf)
      .then(() =>{
       //refactor code
        const update = this.state.books.map((b) => b.id === book.id ? {...b,shelf:shelf} : b);
       
        this.setState(() =>({
          books:update
        }));
   
      });
  
  };

  addNewBook = (book) => {
       this.setState((currentState) =>({
      books:currentState.books.concat([book])
    }));
  };
  

 

  render() {   
   
    const {books} = this.state;
    return (
      <div className="app">
         <Route path="/search" render={() => (

               <Search books={books} addNewBook={this.addNewBook}/>

         )}/>
         
         <Route exact path="/" render={
          () => (            
            <div>
            <Header books={books}/>
          <div className="list-books-content">
            <div>
               <Books status={SHELF_1} books={books} shelfHandler={this.shelfHandler}/>
               <Books status={SHELF_2} books={books} shelfHandler={this.shelfHandler}/>
               <Books status={SHELF_3} books={books} shelfHandler={this.shelfHandler}/>
       
           
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
            <button>Add a book</button>
            </Link>
          </div>
        </div>
          )}/>
        


          
          </div>
        
    
    );
  };
};

export default BooksApp;
