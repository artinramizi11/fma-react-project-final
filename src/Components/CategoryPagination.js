import React from 'react'
import Product from './Product'

const CategoryPagination = ({categoryPaginationProps}) => {
    const {filteredProductsByCategory,selectedCategory,search,price} = categoryPaginationProps;
  return (
     <>
     {filteredProductsByCategory.length === 0 && <p 
        className='text-center w-full h-[300px] flex items-center justify-center bg-gray-200'>
          No Products Found For <span className='underline p-2'>{selectedCategory}</span> category With <span className='underline m-2'>{search}</span><span className='m-2'>{search === "" ? "Empty Search" : ""}</span>{price && `and with ${price}$ price`}
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

export default CategoryPagination