import React from 'react'
import Product from './Product'

const CategoryPagination = ({categoryPaginationProps}) => {
    const {filteredProductsByCategory,selectedCategory,search,price} = categoryPaginationProps;
  return (
     <div className='h-full'>
     {filteredProductsByCategory.length === 0 && 
     <div className='overflow-hidden h-full'>
      <p 
        className='text-center w-full h-full flex items-center justify-center bg-gray-200 overflow-hidden'>
          No Products Found For <span className='underline p-2'>{selectedCategory}</span> category With <span className='underline m-2'>{search}</span><span className='m-2'>{search === "" ? "Empty Search" : ""}</span>{price && `and with ${price}$ price`}
          </p>
      </div>
     }
       {filteredProductsByCategory?.length > 0 ? 
  <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gray-100 rounded-lg shadow-md h-full'>
    {filteredProductsByCategory.map((product) => (
      <div 
        key={product.id} 
        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      > 
        <Product product={product} />
      </div>
    ))}
  </div>
 : 
  <p className="text-gray-600 text-center mt-4">No products found in this category.</p>
}

        </div>
  )
}

export default CategoryPagination