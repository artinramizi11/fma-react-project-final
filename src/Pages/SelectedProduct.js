import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'

const SelectedProduct = () => {

    const {id} = useParams()

    const [product,setProduct] = useState(null)
    const {cartItems,setCartItems} = usePageContext()

    const productExists = cartItems?.some((p) => p.id === product?.id)


    useEffect(() => {
        fetch(`api/products/${id}.json`).then(res => res.json()).then(data => setProduct(data))

    },[])

    function addToCartBtn() {
      setCartItems(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product])
      if(productExists) {
        alert("Product is already in the cart")
      } else {
        alert("You added the product to the cart")
      }
  }
  


  return (
    <div>
        {product ? 
        <>
        <h1 className='text-center text-2xl font-bold mt-3' >You have selected {product?.name}</h1>

<div className='flex justify-between items-center'>
<img src={`api/images/${product?.imageUrl}`} width='500px' />

<div className='flex flex-col gap-2 items-start'>
<h1 className='text-2xl font-bold'>{product?.name}</h1>
<h1>{product?.description}</h1>
<h1>{product?.price}$</h1>
<button className='bg-slate-700 p-2 text-white hover:bg-slate-900 hover:text-orange-300' onClick={addToCartBtn}>{productExists ? "Added to the cart" : "Add to the cart"}</button>
</div>
</div>
        </> 
        : 
        <div className='h-[800px] bg-slate-500 flex items-center justify-center flex-col'> 
        <p className=' text-white'>No product found with that id</p>
        <Link to='/' className='text-2xl font-bold text-green-400 hover:underline'>Back to home</Link>
        </div> }

    </div>
  )
}

export default SelectedProduct