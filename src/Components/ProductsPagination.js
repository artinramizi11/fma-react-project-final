import Product from "./Product";

function ProductsPagination({productsPagination}){
    const {paginationProducts,currentPage,search} = productsPagination;
  
    return (
    <>
     {paginationProducts.length > 0 && <div className="grid grid-cols-4 max-sm:grid-cols-2 max-[450px]:grid-cols-1  max-md:grid-cols-3 max-lg:grid-cols-4 gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
            {paginationProducts?.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-[440px]">
                <Product product={product} />
              </div>
            ))}
          </div>}
  
          {paginationProducts.length === 0 && 
            <p 
              className='text-center w-full h-[500px]  flex items-center justify-center bg-gray-100'>
                No Products Found For <span className='underline p-2'>{search}</span><span className='m-2'>value</span> on {currentPage} page
                </p>
            }
    </>
    ) 
  
  }

  export default ProductsPagination;