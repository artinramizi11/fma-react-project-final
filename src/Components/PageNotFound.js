import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='h-[500px] bg-gray-200 flex items-center justify-center flex-col' >
        <h1 className='font-bold text-3xl text-slate-700'>Page you are looking for is not available on our website!</h1>
        <Link to='/' className='underline text-gray-800 m-4'>Back to home</Link>
    </div>
  )
}

export default PageNotFound