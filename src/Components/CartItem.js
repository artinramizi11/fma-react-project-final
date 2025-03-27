import React, { useEffect } from 'react'
import { usePageContext } from '../context/PageContext'

const CartItem = ({product}) => {

    const {cartItems,setCartItems} = usePageContext()

    useEffect(() => {
        setCartItems(prev => prev.map(product => ({...product, quantity: 1})))
    },[])

    function removeItem(selectedProductId) {
        const filteredProducts = cartItems.filter((product) => product.id !== selectedProductId)
        setCartItems(filteredProducts)
        localStorage.setItem("cartItems", JSON.stringify(filteredProducts))
    }

    function addQuantity(){
        setCartItems(prev => prev.map((pr) => pr.id === product.id ? {...pr, quantity: pr.quantity + 1} : pr))
    }

    function removeQuantity(){
        setCartItems(prev => prev.map((pr) => pr.id === product.id ? {...pr, quantity: pr.quantity !== 1 ? pr.quantity - 1 : 1} : pr ))

    }

  return (
    <div key={product.id} className='grid grid-cols-4 gap-4 justify-between items-center'>
            <img src={`api/images/${product.imageUrl}`} className='w-[150px] h-[150px] object-contain mix-blend-multiply' />
             <div>
              <h1>{product.name}</h1>
              </div>
              <div className='flex gap-4 items-center'>
              <p className="bg-slate-500 rounded-full font-bold text-white p-2 w-10 h-10 text-center hover:cursor-pointer hover:bg-slate-700" onClick={addQuantity}>+</p>
                 <h4>{product.quantity}</h4>
                 <p className="bg-slate-500 rounded-full font-bold text-white p-2 w-10 h-10 text-center hover:cursor-pointer hover:bg-slate-700" onClick={removeQuantity}>-</p>
                 </div>
              <div className='text-right'>
                <h1>{product.price}$</h1>
                <p onClick={() => removeItem(product.id)} className='underline text-red-500 cursor-pointer'>Remove</p>
                </div>
          </div>
  )
}

export default CartItem