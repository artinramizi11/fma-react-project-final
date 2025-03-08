import React, { useEffect, useMemo, useState } from 'react'
import Categories from '../Components/Categories'
import { usePageContext } from '../context/PageContext'
import { useParams, useSearchParams } from 'react-router-dom'
import Product from '../Components/Product'
import CategoryPagination from '../Components/CategoryPagination'

const ProductsByCategory = () => {

    const {categoryName} = useParams()

    const {categories,products,search,selectedCategory,price} = usePageContext()

    const filteredProductsByCategory = useMemo(() => {
        const selectedCategory = categories?.find((category) => category.name.toLowerCase() === categoryName.toLowerCase())
        const allproductsbycategory = products?.filter((product) => {
            const productsBySearch = search ? product.name.toLowerCase().includes(search.toLowerCase()) : true;
            const productsByCategory = selectedCategory ? product.categoryId === selectedCategory?.id : true;
            const productsByPrice = price ? product.price >= price : true;
            return productsBySearch && productsByCategory && productsByPrice
        })
        return allproductsbycategory

    },[categoryName,categories,products,search,price])

    const categoryPaginationProps = {filteredProductsByCategory,selectedCategory,search,price}




  return (
    <>
    <Categories param={categoryName} />
    <CategoryPagination categoryPaginationProps={categoryPaginationProps} />
    </>
  )
}
export default ProductsByCategory