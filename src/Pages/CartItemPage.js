import React, { useEffect, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import Product from '../Components/Product'
import { Link, useNavigate } from 'react-router-dom'

const CartItemPage = () => {

    const {cartItems,setCartItems,setOrdered} = usePageContext()
    const navigate = useNavigate()

    const totalPrice = Math.ceil(cartItems.reduce((acc,product) => acc + product.price , 0))

    function removeItem(selectedProductId) {
        const filteredProducts = cartItems.filter((product) => product.id !== selectedProductId)
        setCartItems(filteredProducts)
        localStorage.setItem("cartItems", JSON.stringify(filteredProducts))
    }

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },[setCartItems])

    function checkOutBtn(){
      setOrdered(true)
      navigate(`/order/${cartItems.length}`)
    }


  return (
    <div className='flex flex-col gap-2'>
        {cartItems.length === 0 && 
        <div className='bg-gray-200 h-[500px] text-center items-center justify-center flex flex-col'>
        <h1 className=''>No product in cart</h1>
        <Link to='/' className='underline cursor-pointer'>Go to products</Link>
        </div>
        }
      
      {cartItems.length > 0 && <div className='h-[600px] overflow-y-auto'> 
      {cartItems.map((product) => {
        return (
            <div className='flex items-center gap-1 justify-between p-4 bg-gray-300'>
            <img src={`api/images/${product.imageUrl}`} className='w-[100px]' />
            <h1 className='font-bold text-2xl w-[500px]'>{product.name}</h1>
            <h1 className='text-3xl'>Price: {Math.ceil(product.price)}$</h1>
            <button className='bg-gray-800 p-2 text-white' onClick={() => removeItem(product.id)}>Remove from cart</button>
            </div>
        )
       })}
      </div>}
        
        {cartItems.length > 0 && 
        <div className='flex justify-between p-3 items-center'>
        <h1 className='font-bold'>Total price of all items is {totalPrice}$</h1>
        <button className='bg-green-400 p-3 text-white font-bold hover:bg-green-500' onClick={checkOutBtn}>Checkout</button>
        </div>}

    </div>
  )
}

export default CartItemPage


