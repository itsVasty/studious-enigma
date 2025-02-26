import { useState } from 'react'
import './App.css'

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}: any){
  return(
    <form id='form-search' name='for-search'>
      <label htmlFor='search_bar'>Search</label><br/>
      <input
        type='text'
        id='search_bar'
        name='search_bar'
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)} // e.target gets the element
      />
      <input id='submit' type='submit' value='submit'></input>
      <br/> <br/>
      <input
        type='checkbox'
        id='in_stock'
        name='in_stock'
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)}
      />
      <label htmlFor='in_stock'> Only show product in stock</label>
    </form>
  )
}

function ProductCategoryRow({category} : any){
  return(
    <tr>
      <th>
        {category}
      </th>
    </tr>
  )
}

function ProductRow({product} : any){
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>

  return(
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductTable({products, filterText, inStockOnly} : any){
  const rows : any = []
  let lastCategory : any = null

  products.forEach((product : any) => {
    // filtering based on text
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ){
      return
    }

    //filtering based on checkbox
    if(
      inStockOnly && !product.stocked
    ){
      return
    }

    if (product.category !== lastCategory){
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}/>
      )
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}/>
    )
    lastCategory = product.category
  })

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function FilteredProductTable({products} : any){
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  
  return(
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <br/><br/>
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly} 
        products={products}
      />
    </>
  )
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return (
    <>
      <h1>Mock Stock!</h1>
      <br/><br/>
      <FilteredProductTable products={PRODUCTS}/>
    </>
  )
}