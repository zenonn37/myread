import React,{Component} from "react";
import { Link, useHistory } from "react-router-dom";
import BookList from "./BooksList";
import * as BooksAPI from '../BooksAPI'

class Search extends React.Component {


  state = {
    search:[],
    query:false,
   
  }

  
  goBack = () =>  {
    const history = useHistory();
    history.push('/')
  }

  

  searchBooks = (query) => {


      
    //do not allow empty query string to server
    if (query === ""){
      
      this.setState(() =>({
        search:[],
        query:false,
      }))
      return;
    };
     
    
    BooksAPI.search(query)
      .then((data) =>{
     
        if (data.error === "undefined" || data.error === "empty query") {
            
              this.setState(() =>({
                search:[],
                query:false,
              }))
              return;
        }

        //run through books and check for id matches
        //if you find a match from user shelf and search
        //append shelf attribute with current value ie-read|current|want
        //if no match is found append shelf:none

        const bkShelf = this.props.books;
       
        let shelf =[]
       
        data.find(el1=>{
          var matched = bkShelf.find(el2 => {
              
              return el2.id === el1.id
          })
          if (matched != null) shelf.push(matched);         
             
      
              
          
      })

      const sFinal = data.map((e) =>({
        ...e,
        shelf:'none'
    }));

     const appendShelf = [...shelf, ...sFinal]


    const view = Array.from(new Set(appendShelf.map(a => a.id)))
    .map(id => {
      return appendShelf.find(a => a.id === id)
    })
   
    

      // console.log(shelf);
      // console.log(sFinal);
      // console.log(appendShelf);
      // console.log(view);


        
       
      
    
      
  

      
         
       
     
        

        this.setState(() =>({
          search:view,
          query:true,
        }))
       
       

       
     
      })
     
  }

  shelfHandler = (shelf,book) =>{
    //do not allow the none option to be passed to update call
     if (shelf === "none") return;        
           
    
       
     
  BooksAPI.update(book,shelf)
   .then((data) =>{
  
     const update = this.state.search.map((b) => b.id === book.id ? {...b,shelf:shelf} : b)
    
     this.setState(() =>({
       search:update
     }))
     this.props.addNewBook({...book,shelf})
   })

} 
  render(){
     const { search, query} = this.state
  return(
<div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={()=> this.goBack()}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                placeholder="Search by title or author"

                onChange={(e) => this.searchBooks(e.target.value)} 
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 {
                   query ? (
                    
                  
                    search.map((search) =>(
                      <BookList books={search} key={search.id} shelfHandler={this.shelfHandler}/>
                      // <div key={s.id}>
                      //   {s.title}
                      // </div>
                    ))
                   ) :
                   (
                     <div>No data</div>
                   )
                 }
               
              </ol>
            </div>
          </div>

  );

              }
              }


export default Search