  import React, { createContext, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext()

export default function WishListContextProvider({children}) {
    let[wishListIdArr, setWishListIdArr] = useState([])
    let[loading,setIsLoading] = useState(false)
    let[wishListProducts,setWishListProducts] = useState([])
    let [selectedProduct,setSelectedProductId] = useState('')
    let [waitToDelete, setWaitToDelete] = useState(false)
 
    
      async function getWishlist() {
       setIsLoading(true)
       try{
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
       
        setIsLoading(false)
       } catch(err){
        toast.error("there is problem in the server , Try again ! ")
       }
        
      }

      async function addToWishlist(id) {
       
       try {
         setWaitToDelete(true)
        setSelectedProductId(id)
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
        } 
        setSelectedProductId('')
        setWishListIdArr(res?.data.data)
        setWaitToDelete(false)
        console.log(res)

       } catch(err){
        toast.error(err.response.data.message,{duration:1000})
       }
       setWaitToDelete(false)
      }

      async function deleteFromWishlist(id) {
        
        try{
          setWaitToDelete(true)
          setSelectedProductId(id)
          let res = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/wishlist/" + id,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
        
       
          setWishListIdArr(res?.data?.data)

          removeFromArray(id)
          setWaitToDelete(false)
          setSelectedProductId('')
          toast.success(res.data.message, {
            duration: 1000,
          });
        
        } catch(err){
          toast.error('There is problem in the server ,Try again !',{duration:1000})
          console.log(err)
        }
        setWaitToDelete(false)
      }
    
    
    
      function removeFromArray(ID){
        let index = wishListIdArr.indexOf(ID)
        wishListProducts.splice(index,1)
      }

  return (
   <WishListContext.Provider value={{addToWishlist, getWishlist,deleteFromWishlist,wishListIdArr,loading,setIsLoading,wishListProducts,waitToDelete,selectedProduct}}>
    {children}
   </WishListContext.Provider>
  )
}
