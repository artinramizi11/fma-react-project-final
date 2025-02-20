import React, { useState } from 'react';
import { usePageContext } from '../context/PageContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChooseLanguage from './ChooseLanguage';

const LoginForm = () => {
  const { t } = useTranslation();

  const [userForm, setUserForm] = useState({ username: '', password: '' });
  const [errorText, setErrorText] = useState('');
  const { setLogged } = usePageContext();
  const navigate = useNavigate();

  const [languageChoosed,setLanguageChoosed] = useState(false)

  function loginBtn() {
    if (!userForm.username || !userForm.password) {
      setErrorText(t('fields-required'));
    } else {
      setLogged(true);
      navigate('/');
      localStorage.setItem("logged", JSON.stringify(true))
    }
  }

  return (
    <>
     {languageChoosed &&  
      <div className=" flex items-center justify-center bg-slate-300">

     <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-slate-700 text-center mb-6">{t('loginFormTitle')}</h1>

        <div className="space-y-5">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            type="text"
            placeholder={t('username-placeholder')}
            name="username"
            onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
            value={userForm.username}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            type="password"
            placeholder={t('password-placeholder')}
            name="password"
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            value={userForm.password}
          />

          <button
            className="w-full p-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all shadow-md"
            onClick={loginBtn}
          >
            {t('submit-btn')}
          </button>

          {errorText && <p className="text-red-600 text-center mt-2">{errorText}</p>}
        </div>
      </div>
      </div>}
      {!languageChoosed && <ChooseLanguage setLanguageChoosed={setLanguageChoosed} />}
    </>
  );
};

export default LoginForm;
