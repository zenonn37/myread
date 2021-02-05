import React from 'react'



import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './components/Books'
import Header from './components/Header'
import Search from './components/Search'
import { Route } from "react-router-dom";


const SHELF_1 = "currentlyReading";
const SHELF_2 = "wantToRead";
const SHELF_3 = "read";


class BooksApp extends React.Component {

  state = {
    books:[],
   
  }

  componentDidMount(){
    this.loadAllData();
  }

  loadAllData = () => {
    BooksAPI.getAll()
    .then((data) =>{
         
         this.setState(() =>({
           books:data
         }))
     
       
    })
  }

  shelfHandler = (shelf,book) =>{
       //do not allow the none option to be passed to update call
        if (shelf === "none") return;        
              
       
          
        
     BooksAPI.update(book,shelf)
      .then(() =>{
     
        const update = this.state.books.map((b) => b.id === book.id ? {...b,shelf:shelf} : b)
       
        this.setState(() =>({
          books:update
        }))
   
      })
  
  } 
  

 

  render() {
   
   
    const {books} = this.state
    return (
      <div className="app">
         <Route path="/search" render={() => (

               <Search books={books}/>

         )}/>
         
         <Route exact path="/" render={
          () => (            
            <div>
            <Header/>
          <div className="list-books-content">
            <div>
               <Books status={SHELF_1} books={books} shelfHandler={this.shelfHandler}/>
               <Books status={SHELF_2} books={books} shelfHandler={this.shelfHandler}/>
               <Books status={SHELF_3} books={books} shelfHandler={this.shelfHandler}/>
       
           
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => {}}>Add a book</button>
          </div>
        </div>
          )}/>
        


          
          </div>
        
    
    )
  }
}

export default BooksApp
