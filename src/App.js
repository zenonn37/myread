import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './components/Books'
import Header from './components/Header'
import Search from './components/Search'


const SHELF_1 = "currentlyReading";
const SHELF_2 = "wantToRead";
const SHELF_3 = "read";


class BooksApp extends React.Component {
  state = {
    books:[],
   
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((data) =>{
           console.log(data);
           this.setState(() =>({
             books:data
           }))
       
         
      })
  }

  shelfHandler = (e) =>{

  } 
  

 

  render() {
   
   
    const {books} = this.state
    return (
      <div className="app">
       
         <Search/>
       
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
          </div>
        
    
    )
  }
}

export default BooksApp
