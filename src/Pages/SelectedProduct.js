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

    },[id])

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
    <div className="p-6 h-screen flex flex-col items-center justify-center">
      {product ? 
        <>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-8 p-6 bg-white shadow-lg rounded-lg">
            <img
              src={`api/images/${product?.imageUrl}`}
              className="w-[400px] h-[400px]"
            />
  
            <div className="flex flex-col gap-4 text-gray-800">
              <h1 className="text-3xl font-semibold">{product?.name}</h1>
              <p className="text-lg text-gray-600">{product?.description}</p>
              <h1 className="text-2xl font-bold text-slate-400">${product?.price}</h1>
              
              <button 
                className="bg-slate-700 text-white px-6 py-3 rounded-lg text-lg font-semibold 
                hover:bg-slate-800 transition-all duration-300 shadow-md"
                onClick={addToCartBtn}
              >
                {productExists ? "Added to the Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </>
       : 
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 w-full">
          <p className="text-2xl font-semibold text-slate-700">No product found with that ID</p>
          <Link to="/" className="text-xl font-bold bg-slate-700 p-2 text-white hover:underline mt-4">
            Back to Home
          </Link>
        </div>
      }
    </div>
  );
  
}

export default SelectedProduct