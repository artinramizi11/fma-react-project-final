import React, { useEffect, useState } from 'react'

const App = () => {

  const [products,setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products.json").then(res => res.json()).then(data => console.log(data))
  },[])


  return (
    <div>
      <h1 className='p-10'>Hello</h1>
    </div>
  )
}

export default App