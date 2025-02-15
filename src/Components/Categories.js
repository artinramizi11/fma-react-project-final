import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'

const Categories = ({param}) => {

  const [categories,setCategories] = useState([])

    const {setSelectedCategory,setSearch,search} = usePageContext()
    const navigate = useNavigate()


    useEffect(() => {
      fetch("api/categories.json").then(res => res.json()).then(data => setCategories(data))

    },[])

    function allProductsText(){
      setSelectedCategory("")
      navigate("/")
    }


  return (
    <div className='flex gap-2 p-2 flex-col'>
              <div>
              <input type='text' placeholder='search by name' onChange={(e) => setSearch(e.target.value)} value={search} />
              </div>
              <div className='flex gap-2'>
              <h1 className={`${!param && "text-pink-600 underline"} cursor-pointer hover:underline`} onClick={allProductsText}>All Products</h1>
              {categories?.map((category) => <Link to={`/category/${category.name}/`} onClick={() => setSelectedCategory(category.name)} className={`hover:underline cursor-pointer ${ param === category.name && "text-pink-600 underline" } `}>{category.name}</Link>)}
              </div>
    
    </div>
  )
}

export default Categories