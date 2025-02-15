import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'
import { useTranslation } from 'react-i18next'

const Product = ({product}) => {

  const { t } = useTranslation()

  const {cartItems,setCartItems} = usePageContext()

  const productExists = cartItems?.some((p) => p.id === product?.id)


  function addToCartBtn() {
    setCartItems(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product])
    if(productExists) {
      alert("Product is already in the cart")
    } else {
      alert("You added the product to the cart")
    }
}

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

},[cartItems])

return (
    <div className='flex items-center gap-2' >
       {product &&
       <>
       <img src={`api/images/${product.imageUrl}`} className='w-[200px] h-[200px]' />
        <div>
          <h1 className='hover:underline cursor-pointer'>{product.name}</h1>
          <h1>{product.price}$</h1>
         <div className='flex flex-col items-start'>
         <button className={`text-white text-sm w-[150px] p-1 hover:bg-slate-900 ${productExists ? "bg-green-400" : "bg-slate-700"}`} onClick={addToCartBtn}>{productExists ? t('added-product-text') : t('add-product-to-cart')}</button>
         <Link to={`/product/${product.id}`} className='p-1 hover:underline text-sm'>{t('visit-product-text')}</Link>
         </div>
        </div>
       </>
       }
    
    </div>
  )
}

export default Product