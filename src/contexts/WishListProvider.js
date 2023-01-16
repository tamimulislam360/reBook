import React, { useEffect, useState } from 'react';
import { createContext } from 'react';


export const wishlistContext = createContext()
const WishListProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([])
    const [reFetch, setReFetch] = useState(null)

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('rebookWishlist'))
        if (list) {
            setWishlist(list)
        }
    }, [reFetch])
    
    return (
        <wishlistContext.Provider value={{wishlist, setReFetch}}>
            {children}
        </wishlistContext.Provider>
    );
};

export default WishListProvider;