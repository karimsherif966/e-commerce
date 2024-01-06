import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../Loadingscreen/LoadingScreen";
import toast from "react-hot-toast";
import { useContext } from "react";
import { WishListContext } from "../../Contexts/WishListContextProvider";
import { CartContext } from "../../Contexts/CartContextProvider";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import { Helmet } from "react-helmet";


export default function WishList() {
  let{getWishlist,deleteFromWishlist,loading,setLoading, wishListProducts,waitToDelete, selectedProduct} = useContext(WishListContext)
  let{addProductToCart, waitToAdd,productToAdd } = useContext(CartContext)
  let[productToDelete, setProductToDelete] = useState('')
  const[isEnter, setIsEnter] = useState(true)

  function selectToDelete(id){
    setProductToDelete(id)
  }

  useEffect(() => {
    getWishlist();
  },[]);

 

  


  return (
    <>
      <Helmet>
          <title>Wishlist</title>
        </Helmet>
      {loading ? (
        <LoadingScreen />
      ) : wishListProducts?.length === 0 ? (
        <div className=" text-center p-4 alert alert-danger text-black fw-bold fs-5 no-product-found">
          <p>No products at Wishlist</p>
        </div>
      ) : (
        <TransitionGroup>
        {wishListProducts?.map((product) => (
           <CSSTransition
           in={isEnter}
           timeout={1000}
           classNames="fade-out"
           key={product.id}
           
           >
          <div className="shadow my-5 p-3 row" key={product.id}>
            <div className="col-md-2">
              <img src={product?.imageCover} className="w-100" alt=""/>
            </div>
            <div className="col-md-3 d-flex justify-content-center flex-column  ">
              <p className="fw-bold  fs-5">{product?.title}</p>
              <p className="text-main fw-bold">{product?.price} EGP</p>
             { waitToDelete && product?.id === selectedProduct && product?.id === productToDelete? 
             <div className="d-flex">
              <div class="fa-solid fa-trash mt-1 me-1 text-danger"></div>
              <div>
                <i className="fas fa-spin fa-spinner text-danger" />
              </div>
             </div>
             :  <div
                className="d-flex text-danger cursor-pointer hover-bright "
                onClick={() => {deleteFromWishlist(product?.id);selectToDelete(product?.id);setIsEnter((v)=>!v);}}
              >
                <div class="fa-solid fa-trash mt-1 me-1 "></div>
                <p>Remove</p>
              </div>}
             
            </div>
            <div>
              {waitToAdd && product?.id === productToAdd ?  <button
                className="btn bg-main text-white hover-bright d-block ms-auto" disabled>
                  <i className="fas fa-spin fa-spinner" /> 
              </button> :   
              <button
                className="btn bg-main text-white hover-bright d-block ms-auto"
                onClick={() => {deleteFromWishlist(product?.id);addProductToCart(product?.id)}}
              >
                Add To Cart
              </button>}
            
            </div>
          </div>
          </CSSTransition>
        )) 
       
        }
        
        </TransitionGroup>
        
      )}
      
    </>
  );
}
