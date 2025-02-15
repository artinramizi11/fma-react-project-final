import { createContext, useContext, useState } from "react";

const PageContext = createContext()

const PageContextProvider = ({children}) => {
    const [logged,setLogged] = useState(() => {
        const loggedStoredUser = localStorage.getItem("logged")
       return loggedStoredUser ? JSON.parse(loggedStoredUser) : false
    })
    const [cartItems,setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems")
        return storedCart ? JSON.parse(storedCart): []
    })
    const [selectedCategory,setSelectedCategory] = useState(null)
    const [categories,setCategories] = useState([])
    const [products,setProducts] = useState([])
    const [search,setSearch] = useState('')
    const [ordered,setOrdered] = useState(false)

    const value = {
        logged,
        setLogged,
        cartItems,
        setCartItems,
        selectedCategory,
        setSelectedCategory,
        categories,
        setCategories,
        products,
        setProducts,
        search,
        setSearch,
        ordered,
        setOrdered
    }

   return (
    <PageContext.Provider value={value}>
    {children}
</PageContext.Provider>
   )
}

const usePageContext = () => {
    const context = useContext(PageContext)
    if(!context) {
        throw new Error("Must be inside a children")
    }

    return context;
}

export {PageContext,PageContextProvider,usePageContext}