import React, { useState } from 'react'
import alflag from '../images/al-flag.png'
import ukflag from '../images/ukflag.jpg'
import i18n from '../i18n'

const ChooseLanguage = ({setLanguageChoosed}) => {

    const [clickedCountry,setClickedCountry] = useState("")

    const languages = [
        {
            name: "Albania",
            image: alflag,
            value: "al"
        },
        {
            name: "English",
            image: ukflag,
            value: "en"
        }
    ]

    function handleChange(){
        if(clickedCountry === ""){
            alert("You must be choose a language")
        } else {
            setLanguageChoosed(true)
        }
    }

  return (
    <div className="p-4 flex flex-col items-center justify-center bg-gray-100">
    <div className="languages flex flex-wrap gap-4 bg-slate-800 p-6 rounded-lg shadow-lg">
      {languages.map((language) => (
        <div key={language.name} className="flex flex-col items-center justify-center">
          <img
          onClick={() => {
            setClickedCountry(language.value)
            i18n.changeLanguage(language.value)
        }}
            className={`w-40 h-40 rounded-full cursor-pointer border-4 ${clickedCountry === language.value ? "border-slate-500" : "border-transparent"} hover:border-slate-500 transition duration-300`}
            src={language.image}
            alt={language.name}
          />
          <h1 className="text-white mt-2 text-lg font-semibold">{language.name}</h1>
        </div>
      ))}
    </div>
  
    <button onClick={handleChange} className="mt-6 px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700">
      Next
    </button>
  </div>
  
  )
}

export default ChooseLanguage