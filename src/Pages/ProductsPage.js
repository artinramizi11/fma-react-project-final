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

    console.log(currentPage)


  return (
   <>
   <Categories />
   {categoryName ? <p>You selected {categoryName} Category</p> : null}
    <div className='grid grid-cols-4 h-[600px] bg-gray-200 p-8'>
        {paginationProducts?.map((product) => <Product key={product.id} product={product} />)}
        {paginationProducts.length === 0 && <h1>No Product Available With <span className=' p- underline'>{search}</span> On <span className='underline'>{currentPage}</span> Page</h1>}
    </div>
    <div className='flex justify-center gap-3'>
      {Array.from({length: totalPages}).map((_,index) => <Link onClick={() => setCurrentPage(index + 1)} 
      className={`p-4 m-3 font-bold text-2xl text-white border rounded-[50%] text-center ${index + 1 === currentPage ? "bg-gray-800" : "bg-gray-400"}`} 
      to={`/page/${index + 1}`}>{index + 1}</Link>)}
    </div>
   </>
  )
}

export default ProductsPage;

