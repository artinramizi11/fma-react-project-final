import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'
import { useTranslation } from 'react-i18next'

const Product = ({product}) => {

  const {cartItems} = usePageContext()
  const navigate = useNavigate()

  const existsInCart = cartItems.find((pr) => pr.id === product.id)




useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

},[cartItems])

return (
    <div className='flex items-center gap-2 justify-center h-full' >
       {product &&
       <div className='relative w-full h-full flex flex-col items-center justify-center' onClick={() => navigate(`/product/${product.id}`)}>
       <img src={`api/images/${product.imageUrl}`} className='object-contain w-[250px] h-[250px] bg-transparent' />
        <div className='flex flex-col items-center gap-2'>
          <h1 className='hover:underline cursor-pointer'>{product.name}</h1>
          <h1>{product.price}$</h1>
         <div className='flex flex-col items-start'>
         </div>
        </div>
       {existsInCart &&   <p className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        Added to cart
      </p> }
      {!existsInCart && <p className="absolute top-2 right-2 bg-slate-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        Add to cart
      </p>}
       </div>
       }
    
    </div>
  )
}

export default Product