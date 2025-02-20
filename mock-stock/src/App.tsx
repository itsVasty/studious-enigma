import { useState } from 'react'
import './App.css'

function SearchBar(){
  return(
    <>
      <form id='form-search' name='for-search'>
        <label htmlFor='search_bar'>Search</label><br/>
        <input type='text' id='search_bar' name='search_bar'></input>
        <input id='submit' type='submit' value='submit'></input>
        <br/> <br/>
        <input type='checkbox' id='in_stock' name='in_stock'></input>
        <label htmlFor='in_stock'> Only show product in stock</label>
      </form>
    </>
  )
}

function ResultsTable(){
  return(<>
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </table>
  </>)
}

export default function App() {
  return (
    <>
      <h1>Mock Stock!</h1>
      <br/><br/>
      <SearchBar/>
      <br/><br/>
      <ResultsTable/>
    </>
  )
}