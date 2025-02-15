import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../Components/Product'
import { usePageContext } from '../context/PageContext'
import Categories from '../Components/Categories'

const ProductsPage = () => {

  const {pageNumber,categoryName} = useParams()
  const {products,search} = usePageContext()
  const [currentPage,setCurrentPage] = useState(1)
  const [pageSize,setPageSize] = useState(7)

   const paginationProducts = useMemo(() => {

    return products?.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

    },[products,currentPage,pageSize,search])

    const totalPages = Math.ceil(products.length / pageSize);

    useEffect(() => {
      if(pageNumber) {
        setCurrentPage(Number(pageNumber))
      } else {
        setCurrentPage(1)
      }

    },[pageNumber])


    return (
      <>
        <Categories />
  
    
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
          {paginationProducts?.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <Product product={product} />
            </div>
          ))}
    
        

        </div>

        {paginationProducts.length === 0 && (
            <p 
            className='text-center w-full h-[300px] flex items-center justify-center bg-gray-200'>
              No Products Found For <span className='underline p-2'>{search}</span><span>value</span> on {currentPage} page
              </p>
          )}
    
        <div className="flex justify-center items-center gap-3 m-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link 
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-12 h-12 flex items-center justify-center font-bold text-lg border rounded-full transition-all duration-300
                ${index + 1 === currentPage 
                  ? "bg-slate-600 text-white shadow-xl scale-110" 
                  : "bg-gray-300 text-gray-800 hover:bg-slate-600 hover:text-white hover:scale-105"}
              `}
              to={`/page/${index + 1}`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </>
    );
    
}

export default ProductsPage;

