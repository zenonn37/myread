import React from 'react'



const SelectComp  = ({shelf,shelfHandler,book}) => {

    return(

    <select value={shelf} onChange={(e)=> shelfHandler(e.target.value,book)}>
    <option value="move" disabled>Move to...</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none">None</option>
  </select>
  );

}

export default SelectComp