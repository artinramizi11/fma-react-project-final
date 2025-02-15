import React, { useEffect, useMemo, useState } from 'react'
import Categories from '../Components/Categories'
import { usePageContext } from '../context/PageContext'
import { useParams } from 'react-router-dom'
import Product from '../Components/Product'

const ProductsByCategory = () => {

    const {categoryName} = useParams()

    const {categories,products,search,selectedCategory} = usePageContext()


    const filteredProductsByCategory = useMemo(() => {
        const selectedCategory = categories?.find((category) => category.name.toLowerCase() === categoryName.toLowerCase())
        const allproductsbycategory = products?.filter((product) => {
            const productsBySearch = search ? product.name.toLowerCase().includes(search.toLowerCase()) : true;
            const productsByCategory = selectedCategory ? product.categoryId === selectedCategory?.id : true;
            return productsBySearch && productsByCategory
        })
        return allproductsbycategory

    },[categoryName,categories,products,search])


  return (
    <>
    <Categories param={categoryName} />
    {filteredProductsByCategory.length === 0 && <p 
    className='text-center w-full h-[300px] flex items-center justify-center bg-gray-200'>
      No Products Found For <span className='underline p-2'>{selectedCategory}</span> category With <span className='underline p-2'>{search}</span><span>value</span>
      </p>}
    <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gray-100 rounded-lg shadow-md'>
    {filteredProductsByCategory?.map((product) => {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"> 
          <Product product={product}/>
        </div>
      )
    })}
    </div>

    </>
  )
}
export default ProductsByCategory