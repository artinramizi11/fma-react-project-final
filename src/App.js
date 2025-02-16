import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './Pages/ProductsPage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SelectedProduct from './Pages/SelectedProduct'
import { usePageContext } from './context/PageContext'
import LoginForm from './Components/LoginForm'
import ProductsByCategory from './Pages/ProductsByCategory'
import CartItemPage from './Pages/CartItemPage'
import ProductsPage from './Pages/ProductsPage'
import PageNotFound from './Components/PageNotFound'
import Order from './Components/Order'
import OrdersPage from './Pages/OrdersPage'

const App = () => {

  const {logged,setProducts,setCategories} = usePageContext()

  useEffect(() => {
    fetch("api/products.json").then(res => res.json()).then(data => setProducts(data))
    fetch("api/categories.json").then(res => res.json()).then(data => setCategories(data))
  },[])

  return (
    <div>
      <Navbar />
     {logged &&  
    <>
     <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/product/:id' element={<SelectedProduct />} />
        <Route path='/page/:pageNumber?' element={<ProductsPage />} />
        <Route path='/category/:categoryName' element={<ProductsByCategory />} />
        <Route path='/cartitems' element={<CartItemPage />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      
    </>
      }
      { logged === false && <LoginForm /> }
      <Footer />
    </div>
  )
}

export default App