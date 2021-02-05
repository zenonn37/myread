import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './components/Books'
import Header from './components/Header'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    books:[],
    shelf_current:[],
    self_read:[],
    shelf_want:[]
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((data) =>{
          
           this.setState(() =>({
             books:data
           }))
           this.setState(() =>({
            shelf_current:data.filter((current) => current.shelf === "currentlyReading")
          }))
          this.setState(() =>({
            shelf_want:data.filter((current) => current.shelf === "wantToRead")
          }))
          this.setState(() =>({
            self_read:data.filter((current) => current.shelf === "read")
          }))
      })
  }

  shelfHandler = (e) =>{

  }

 

  render() {
    const shelf_1 = "Currently Reading";
    const shelf_2 = "Want to Read";
    const shelf_3 = "Read";

    const {shelf_current, self_read, shelf_want} = this.state
    return (
      <div className="app">
       
         <Search/>
       
          <div>
              <Header/>
            <div className="list-books-content">
              <div>
                 <Books shelf={shelf_1} books={shelf_current} shelfHandler={this.shelfHandler}/>
                 <Books shelf={shelf_2} books={shelf_want} shelfHandler={this.shelfHandler}/>
                 <Books shelf={shelf_3} books={self_read} shelfHandler={this.shelfHandler}/>
         
             
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
          </div>
        
    
    )
  }
}

export default BooksApp
