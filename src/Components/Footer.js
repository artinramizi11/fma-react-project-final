import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t} = useTranslation()
  return (
    <div className='bg-slate-700 p-2 font-bold text-white text-center'>
        <h4>{t("footer")}</h4>
    </div>
  )
}

export default Footer