import React, { useState } from 'react'

import i18n from '../i18n'
import { languages } from '../languagesData'
import { useTranslation } from 'react-i18next'

const ChooseLanguage = ({setLanguageChoosed}) => {

  const { t,i18n } = useTranslation()

  const currentLanguage = i18n.language;

    const [clickedCountry,setClickedCountry] = useState(currentLanguage)

    function handleChange(){
        if(clickedCountry === ""){
            alert("You must be choose a language")
        } else {
            setLanguageChoosed(true)
        }
    }

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">

    <div className="languages flex flex-wrap gap-4 p-6 border shadow-lg rounded-lg ">
      {languages.map((language) => (
        <div key={language.name} className="flex flex-col items-center justify-center ">
          <img
          onClick={() => {
            setClickedCountry(language.value)
            i18n.changeLanguage(language.value)
        }}
            className={`w-40 h-40 rounded-full cursor-pointer border-4 ${currentLanguage === language.value ? "border-slate-500" : "border-transparent"} hover:border-slate-500 transition duration-300`}
            src={language.image}
            alt={language.name}
          />
          <h1 className="mt-2 text-lg font-semibold">{language.name}</h1>
        </div>
      ))}
    </div>
  
    <button onClick={handleChange} className="mt-6 px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700">
      {t('next-btn')}
    </button>
  </div>
  
  )
}

export default ChooseLanguage