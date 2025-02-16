import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageContext } from '../context/PageContext';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import albanianflag from '../images/al-flag.png';
import ukflag from '../images/ukflag.jpg';

const Navbar = () => {
  const [language, setLanguage] = useState('');

  const { t } = useTranslation();
  const { logged, setLogged, cartItems } = usePageContext();

  useEffect(() => {
    if(logged === false) {
      localStorage.removeItem("logged")
    } 
    return;
  },[logged])

  return (
    <nav className="bg-slate-700 p-5 text-white font-bold flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide hover:text-gray-300 transition">
        Artini's Store
      </Link>

      <div className="flex items-center gap-6 md:gap-12">
        {logged && <Link className="hover:text-gray-300 transition" to="/">{t('home-nav-text')}</Link>}

        {logged && <div className="relative">
            <Link className="hover:text-gray-300 transition" to="/cartitems">
              {t('home-cart-text')}
            </Link>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        }

        <Link to="/" className="hover:text-gray-300 transition" onClick={() => setLogged(false)}>
          {logged ? t('home-logout-text') : t('home-login-text')}
        </Link>
        {logged && <Link to='/orders'>{t("order-history")}</Link>}
      </div>

      <div className="flex items-center gap-3">
        <img
          src={albanianflag}
          className={`w-8 h-8 cursor-pointer rounded-full border-2 ${language === 'al' ? 'border-white' : 'border-transparent'} hover:opacity-80 transition`}
          onClick={() => {
            i18n.changeLanguage('al');
            setLanguage('al');
          }}
        />
        <img
          src={ukflag}
          className={`w-8 h-8 cursor-pointer rounded-full border-2 ${language === 'en' ? 'border-white' : 'border-transparent'} hover:opacity-80 transition`}
          onClick={() => {
            i18n.changeLanguage('en');
             setLanguage('en');
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
