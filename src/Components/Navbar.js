import React from 'react'
import { Link } from 'react-router-dom'
import { usePageContext } from '../context/PageContext'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t } = useTranslation()
    const {logged,setLogged,cartItems} = usePageContext()
  return (
    <div className='bg-slate-700 p-5 text-white font-bold flex gap-6'>
      <select className='text-black' onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value='al'>Albania</option>
        <option value='en'>English</option>
      </select>
        {logged && <Link to='/'>{t('home-nav-text')}</Link>}
       {logged && <div className='relative'><Link to='/cartitems'>{t("home-cart-text")}</Link><p 
       className='absolute top-[-10px] right-[-20px] w-[25px] h-[25px] text-center bg-red-200 p-1 rounded-full text-sm cursor-pointer'>{cartItems.length}</p></div>}
        <Link to='/' onClick={() => setLogged(false)}>{logged ? t("home-logout-text") : t("home-login-text")}</Link>
    </div>
  )
}

export default Navbar