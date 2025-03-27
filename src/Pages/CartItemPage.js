import React, { useEffect, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import Product from '../Components/Product'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CartItem from '../Components/CartItem'

const CartItemPage = () => {

    const {cartItems,setCartItems,setOrdered} = usePageContext()
    const navigate = useNavigate()

    const { t } = useTranslation()

    const totalPrice = Math.ceil(cartItems?.reduce((acc, product) => acc + (product.quantity * product.price), 0));

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },[cartItems])

    function checkOutBtn(){
      setOrdered(true)
      navigate(`/order/${cartItems.length}`)
    }

    function removeAllItems(){
      setCartItems([])
    }


  return (
    <div className="gap-4 p-4 md:p-6 bg-slate-100 h-full overflow-x-auto">
    {cartItems.length === 0 && 
      <div className="bg-white p-6 text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold text-gray-700">{t("no-products-in-cart")}</h1>
        <Link to="/" className="mt-3 text-slate-800 hover:underline text-lg underline">
          {t("go-to-products")}
        </Link>
      </div>
  }
  
    {cartItems.length > 0 && 
    
      <div className="bg-slate-200 shadow-lg rounded-lg p-4 flex flex-col gap-3">
      <div className='flex justify-between'>
    <h1 className='font-bold text-gray-600'>Shopping Cart</h1>
    <p className='text-red-500 underline cursor-pointer' onClick={removeAllItems}>Remove all</p>
    </div>
        {cartItems.map((product) => (
          <CartItem product={product} />
        ))}
        {cartItems.length > 0 && 
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg mt-4">
        <h1 className="text-xl font-semibold text-gray-800">Total Price: {totalPrice}$</h1>
        <button
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition"
          onClick={checkOutBtn}
        >
          Checkout
        </button>
      </div>
    }
      </div>
    }
  
    
  </div>
  
  )
}

export default CartItemPage


