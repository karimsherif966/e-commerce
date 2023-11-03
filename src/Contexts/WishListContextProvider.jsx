import React, { createContext, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext()

export default function WishListContextProvider({children}) {
    let[wishListIdArr, setWishListIdArr] = useState([])
    let[loading,setIsLoading] = useState(false)
    let[wishListProducts,setWishListProducts] = useState([])
    
 
    
      async function getWishlist() {
       setIsLoading(true)
        let res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const newWishListProducts = res?.data.data
        setWishListProducts(newWishListProducts)
     
        const newWishListIdArr = res?.data.data.map(product=>product.id)
        setWishListIdArr(newWishListIdArr)
        if(res.status === '200'){setIsLoading(false)}

        console.log(res.status)
      }

      async function addToWishlist(id) {
        setIsLoading(true)
        let res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId: id },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.status === "success") {
          toast.success(res.data.message, {
            duration: 1000,
          });
        } else {
          toast.error(res.data.message, {
            duration: 1000,
          });
        }
        setWishListIdArr(res?.data?.data)
        setIsLoading(false)
       
      }
      async function deleteFromWishlsit(id) {
        let res = await axios.delete(
          "https://ecommerce.routemisr.com/api/v1/wishlist/" + id,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.status === "success") {
          toast.success(res.data.message, {
            duration: 1000,
          });
        } else {
          toast.error(res.data.message, {
            duration: 1000,
          });
        }
        
        setWishListIdArr(res?.data?.data)
      }
    
      function checkWishlist(id) {
       console.log(wishListIdArr)
        if (wishListIdArr.includes(id)) {
          deleteFromWishlsit(id);
        } else {
          addToWishlist(id);
        }
        

      }
    

  return (
   <WishListContext.Provider value={{addToWishlist, getWishlist,deleteFromWishlsit,checkWishlist,wishListIdArr,loading,setIsLoading,wishListProducts}}>
    {children}
   </WishListContext.Provider>
  )
}
