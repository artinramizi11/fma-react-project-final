import React, { useEffect, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { Link } from 'react-router-dom'

const Order = () => {
    const {ordered,setOrdered,cartItems,setCartItems} = usePageContext()

    const [totalPrice,setTotalPrice] = useState(0)

    useEffect(() => {
        if(ordered && cartItems.length > 0){
            const price = Math.ceil(cartItems.reduce((acc, pr) => acc + pr.price, 0));
            setTotalPrice(price)
            setCartItems([])
        } else return;

    },[ordered,cartItems])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    },[cartItems])


  return (
    <div>
        {ordered &&
        <div className='h-[500px] bg-gray-200 flex items-center justify-center flex-col'>
            <h1 className='text-2xl'>Thanks for trusting us!</h1>
            <p>Price of purchased items: <span className='underline'>{totalPrice}</span>$ </p>
            <p className='underline'>Check your email for more information</p>
            <Link replace  to='/' className='underline cursor-pointer'>Back to home</Link>
        </div>
        }
        {!ordered &&
        <div className='bg-gray-200 h-[500px] flex items-center justify-center flex-col'>
            <h1 className='text-2xl'>No Access To This Link</h1>
            <Link to='/' className='underline'>Back to home</Link>
        </div>
        }
    </div>
  )
}

export default Order