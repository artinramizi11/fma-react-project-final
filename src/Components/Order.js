import React, { useEffect, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { Link } from 'react-router-dom'

const Order = () => {
    const {ordered,setOrdered,cartItems,setCartItems,orders,setOrders} = usePageContext()
    const [totalPrice,setTotalPrice] = useState(0)

    useEffect(() => {
        if(ordered && cartItems.length > 0){
          const price = Math.ceil(cartItems?.reduce((acc, product) => acc + (product.quantity * product.price), 0));
          setTotalPrice(price)
            setOrders([...orders, {cartItems, date: new Date().toLocaleDateString()}])
            setCartItems([])
        } else return;

    },[ordered,cartItems,orders,cartItems,setCartItems])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    },[cartItems])


  return (
    <div className="flex items-center justify-center bg-slate-100 p-6 h-screen">
  {ordered ? 
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>
        Total Price of all items: <span className="text-green-600 font-semibold">${totalPrice}</span>
      </p>
    </div>
   : 
    <div>
    <p>You dont have access to this link!</p>
    </div>
  }
</div>

  )
}

export default Order