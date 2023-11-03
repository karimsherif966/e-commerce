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
  
 

  async function removeCartItem(productId) {
    setIsLoading(true);
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    setNumOfCarts(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    debugger;
    setCartProducts(data.data.products);
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
      setCartId(res.data.data.id);
      setNumOfCarts(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartProducts(res.data.data.products);
      console.log(res)
    } catch (err) {
      setError(true);
    }
  }

  async function addProductToCart(productId) {
    setIsLoading(true)
    setSelectedProductId(productId)
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    if (data.status == "success") {
     
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

  async function updateProductCount(productId, count, index) {
    let newCartProducts = [...cartProducts];
    newCartProducts[index]["count"] = count;
    setCartProducts(newCartProducts);
    clearTimeout(requestTimeOut);
    setRequestTimeOut(
      setTimeout(async () => {
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

        console.log(res);
      }, 500)
    );
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
