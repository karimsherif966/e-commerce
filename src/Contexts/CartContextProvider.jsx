import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [numOfCarts, setNumOfCarts] = useState(0);
  let [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartProducts, setCartProducts] = useState([]);
  let [load, setIsLoading] = useState(false);
  let [erorr, setError] = useState(false);
  let [requestTimeOut, setRequestTimeOut] = useState();
  let [cartId, setCartId] = useState("");
  let [selectedProductId, setSelectedProductId] = useState('')
  let [waitToDelete, setWaitToDelete] = useState(false)
  let [waitToChangeCount,setWaitToChangeCount] = useState(false)
  let [sign, setSign] = useState('')
  let [waitToAdd, setWaitToAdd] = useState(false)
  let [productToAdd, setProductToAdd] = useState('')
  
 

  async function removeCartItem(productId) {
    setWaitToDelete(true);
    try{
      setSelectedProductId(productId)
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast.success('Product removed from cart', {
      duration: 1000,
    });
    setWaitToDelete(false);
    setNumOfCarts(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    setCartProducts(data.data.products);
    setSelectedProductId('')
    } catch(err){
      toast.error(err.response.data.message,{duration:1000})
    }

    setWaitToDelete(false)
    
  }
  async function getUserCart() {
    setIsLoading(true);
    try {
      let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
  
      setIsLoading(false);
      setCartId(res.data.data._id);
      
      setNumOfCarts(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartProducts(res.data.data.products);
    } catch (err) {
      setError(true);
    }
  }

  async function addProductToCart(productId) {
    setIsLoading(true)
    setWaitToAdd(true)
    try {
      setSelectedProductId(productId)
      setWaitToAdd(true)
      setProductToAdd(productId)
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.status === "success") {
       
        toast.success(data.message, {
          duration: 1000,
        });
        setNumOfCarts(data.data.products.length);
      } else {
        toast.error(data.message, {
          duration: 1000,
        });
      }
      setIsLoading(false);
      setSelectedProductId('')
      setWaitToAdd(false)
      setProductToAdd('')
      
    } catch(err){
      toast.error(err.response.data.message,{duration:1000})
      setWaitToAdd(false)
      setIsLoading(false)
      setSelectedProductId('')
    }
    setWaitToAdd(false)
    setIsLoading(false)
    
   
  }

  async function clearCart() {
    setNumOfCarts(0);
    setTotalCartPrice(0);
    setCartProducts([]);

    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  async function updateProductCount(productId, count, index,sign) {
    setWaitToChangeCount(true)

    try {
      setSign(sign)
      setSelectedProductId(productId)
      let newCartProducts = [...cartProducts];
      newCartProducts[index]["count"] = count;
      setCartProducts(newCartProducts);
        
          let res = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setNumOfCarts(res.data.numOfCartItems);
          setTotalCartPrice(res.data.data.totalCartPrice);
          setCartProducts(res.data.data.products);
  
          console.log(selectedProductId)  
        
        
      
      
      setWaitToChangeCount(false)
      setSelectedProductId('')
      setSign('')
    } catch(err){
      toast.error(err.response.data.message,{duration:1000})
    }
    setWaitToChangeCount(true)

    
  }

  let { data } = useQuery("cart", getUserCart, {
    casheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    getUserCart();
  }, []);

  
  return (
    <CartContext.Provider
      value={{
        numOfCarts,
        setNumOfCarts,
        addProductToCart,
        getUserCart,
        totalCartPrice,
        cartProducts,
        load,
        erorr,
        cartId,
        removeCartItem,
        clearCart,
        updateProductCount,
        selectedProductId,
        setSelectedProductId,
        waitToDelete,
        waitToChangeCount,
        sign,
        waitToAdd,
        productToAdd
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
