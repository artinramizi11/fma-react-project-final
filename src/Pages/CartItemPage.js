import React, { useEffect, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import Product from '../Components/Product'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CartItemPage = () => {

    const {cartItems,setCartItems,setOrdered} = usePageContext()
    const navigate = useNavigate()

    const { t } = useTranslation()

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
    <div className="flex flex-col gap-4 p-4 md:p-6 bg-slate-100 min-h-screen">
    {cartItems.length === 0 && (
      <div className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center justify-center h-[500px]">
        <h1 className="text-2xl font-semibold text-gray-700">{t("no-products-in-cart")}</h1>
        <Link to="/" className="mt-3 text-blue-500 hover:underline text-lg">
          {t("go-to-products")}
        </Link>
      </div>
    )}
  
    {cartItems.length > 0 && (
      <div className="h-[600px] overflow-y-auto bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
        {cartItems.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-300">
            <img src={`api/images/${product.imageUrl}`} className="w-[100px] h-[100px] object-cover rounded-md" />
              <h1 className="font-semibold text-xl text-gray-800 md:w-[400px]">{product.name}</h1>
              <h1 className="text-2xl font-bold text-green-600">Price: {Math.ceil(product.price)}$</h1>
              <button
              className="bg-slate-600 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
              onClick={() => removeItem(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  
    {cartItems.length > 0 && (
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">Total Price: {totalPrice}$</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition"
          onClick={checkOutBtn}
        >
          Checkout
        </button>
      </div>
    )}
  </div>
  
  )
}

export default CartItemPage


