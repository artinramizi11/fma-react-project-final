import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../Components/Product'
import { usePageContext } from '../context/PageContext'
import Categories from '../Components/Categories'
import ProductsPagination from '../Components/ProductsPagination'

const ProductsPage = () => {

  const {pageNumber,categoryName} = useParams()
  const {products,search,price} = usePageContext()
  const [currentPage,setCurrentPage] = useState(1)
  const [pageSize,setPageSize] = useState(7)

   const paginationProducts = useMemo(() => {

    return products?.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter((product) => {
      const searchByPrice = price ? product.price >= price : true
      const searchByName = product.name.toLowerCase().includes(search.toLowerCase())
      return searchByName && searchByPrice
    })

    },[products,currentPage,pageSize,search,price])

    const totalPages = Math.ceil(products?.length / pageSize);

    const productsPagination = {paginationProducts,currentPage,price,search}

    useEffect(() => {
      if(pageNumber) {
        setCurrentPage(Number(pageNumber))
      } else {
        setCurrentPage(1)
      }

    },[pageNumber])


    return (
      <div className='p-2'>
        <Categories />
        <ProductsPagination productsPagination={productsPagination}  />
    
        <div className="flex justify-center items-center gap-3 m-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link 
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-12 h-12 flex items-center justify-center font-bold   
                ${index + 1 === currentPage 
                  ? "bg-slate-600 text-white" 
                  : "bg-gray-300 text-white-800 hover:bg-slate-600 hover:text-white"}
              `}
              to={`/page/${index + 1}`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>
    );
    
}

export default ProductsPage;



