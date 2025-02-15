import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

const LoginForm = () => {
  const { t }  = useTranslation()

    const [userForm,setUserForm] = useState({username: "",password: ""})
    const [errorText,setErrorText] = useState('')
    const {setLogged} = usePageContext()
    const navigate = useNavigate()

    function loginBtn(){
       if(!userForm.username || !userForm.password) {
        setErrorText(t("fields-required"))
       } else {
        setLogged(true)
        navigate("/")
       }
    }

  return (
    <div className='h-[400px] bg-slate-400 flex items-center justify-center flex-col'>
        <h1 className='font-bold text-2xl m-4 text-slate-800'>{t('loginFormTitle')}</h1>
        <div className='p-2 gap-2 flex flex-col items-center w-[300px] p-3' >
       <input className='p-1 w-full' type='text' placeholder={t("username-placeholder")} name='username' onChange={(e) => setUserForm({...userForm, username: e.target.value})}  value={userForm.username}  />
       <input className='p-1 w-full' type='text' placeholder={t("password-placeholder")} name='password' onChange={(e) => setUserForm({...userForm, password: e.target.value})}  value={userForm.password}  />
       <button className='bg-green-400 w-full' onClick={loginBtn}>{t("submit-btn")}</button>
       {errorText && <p className='text-slate-800'>{errorText}</p>}
        </div>
    </div>
  )
}

export default LoginForm