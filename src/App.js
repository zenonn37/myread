import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Books from './components/Books';
import Header from './components/Header';
import Search from './components/Search';
import { Route, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Loader from './components/Loader';
import { fadeInUp } from "./animations/fadeUpIn";




const SHELF_1 = "currentlyReading";
const SHELF_2 = "wantToRead";
const SHELF_3 = "read";




class BooksApp extends React.Component {

  state = {
    books:[],
    loading:true,
   
  };

  //load server book shelf data
  componentDidMount(){
    this.loadAllData();
  };

  //book shelf api call function
  loadAllData = () => {
    this.setState(() =>({
      loading:true
    }));
   
    BooksAPI.getAll()
    .then((data) =>{
         //set the state with results
       
          this.setState(() =>({
            books:data,
            loading:false
          }));
       
       
     
       
    });
  };

  //handle indvidual book status
  shelfHandler = (shelf,book) =>{                  
       
          
        
     BooksAPI.update(book,shelf)
      .then(() =>{
       //refactor code
        const update = this.state.books.map((b) => b.id === book.id ? Object.assign({},b,{shelf:shelf}) : b);

        const filterNone = update.filter((books) => books.shelf !== 'none')
       
        this.setState(() =>({
          books:filterNone
        }));
   
      });
  
  };

  addNewBook = (book) => {
       this.setState((currentState) =>({
      books:currentState.books.concat([book])
    }));
  };
  

 

  render() {   
   
    const {books, loading} = this.state;
    return(
      <div className="app">

      

         <Route path="/search" render={() => (

               <Search books={books} addNewBook={this.addNewBook}/>

         )}/>
         
         <Route exact path="/" render={
          () => (          
            
      
            <div>

      
            <Header books={books} loading={loading}/>
          <div className="list-books-content">
          {loading ? (
                   <Loader/>
               ) : (<motion.div
                    variants={fadeInUp}  
                    initial="initial"
                    animate='animate'
                
                
               >
                   <Books status={SHELF_1} books={books} shelfHandler={this.shelfHandler}/>
                   <Books status={SHELF_2} books={books} shelfHandler={this.shelfHandler}/>
                   <Books status={SHELF_3} books={books} shelfHandler={this.shelfHandler}/>
                
            
                  </motion.div>) }
          
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
