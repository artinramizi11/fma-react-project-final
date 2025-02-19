import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'
import { useTranslation } from 'react-i18next'

const Product = ({product}) => {

  const { t } = useTranslation()

  const {cartItems,setCartItems} = usePageContext()
  const navigate = useNavigate()

  const productExists = cartItems?.some((p) => p.id === product?.id)


useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

},[cartItems])

return (
    <div className='flex items-center gap-2 justify-center' >
       {product &&
       <div onClick={() => navigate(`/product/${product.id}`)} className='flex flex-col items-center gap-2'>
       <img src={`api/images/${product.imageUrl}`} className='w-[200px] h-[200px]' />
        <div>
          <h1 className='hover:underline cursor-pointer'>{product.name}</h1>
          <h1>{product.price}$</h1>
         <div className='flex flex-col items-start'>
         </div>
        </div>
       </div>
       }
    
    </div>
  )
}

export default Product