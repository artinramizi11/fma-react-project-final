import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageContext } from '../context/PageContext';

const Categories = ({ param }) => {
  const [categories, setCategories] = useState([]);
  const { setSelectedCategory, setSearch, search,price,setPrice } = usePageContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('api/categories.json')
    .then((res) => res.json())
    .then((data) => setCategories(data));

  }, []);

  function allProductsText() {
    setSelectedCategory('');
    navigate('/');
  }

  return (
    <div className="flex  flex-col p-2 gap-4">
      
      <div className="flex items-center justify-between p-3 gap-3 border-b border-gray-300 pb-3 max-lg:flex max-lg:flex-col max-lg:items-start">
       <div className='grid grid-cols-[auto_1fr] gap-2 items-center'>
       <p className="text-gray-700 font-medium">Search:</p>
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
       </div>
  <div className='grid grid-cols-[auto_1fr] gap-2 items-center'>
    <p>Search by price:</p>
  <input
    type="number"
    placeholder="Enter Price"
    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 "
    onChange={(e) => setPrice(e.target.value)} value={price}
  />
  </div>

      </div>

      <div className="mt-4">
        <h1 className={`text-lg font-semibold cursor-pointer transition-all ${!param ? 'text-slate-600 underline': 'text-gray-800 hover:underline hover:text-blue-600'}`}
          onClick={allProductsText}>All Products</h1>

        <div className="flex flex-wrap gap-3 mt-3">
          {categories?.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name}/`}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all border border-gray-300 shadow-sm 
                ${
                  param === category.name
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-slate-700 hover:text-white hover:shadow-md'
                }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
