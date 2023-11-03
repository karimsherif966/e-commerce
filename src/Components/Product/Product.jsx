import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContextProvider";
import { useContext } from "react";
import { WishListContext } from "../../Contexts/WishListContextProvider";

export default function Product({ product }) {
  let [hover, setHover] = useState(false);
  let { addProductToCart,selectedProductId} = useContext(CartContext);
  let { getWishlist,checkWishlist, wishListIdArr} = useContext(WishListContext)
  
 
  

  useEffect(()=>{
    getWishlist()
  },[])

 
  


 
  


  function addHover() {
    setHover(true);
  }
  function removeHover() {
    setHover(false);
  }

  let navigate = useNavigate();
  return (
    <div className="col-md-3 cursor-pointer" key={product.id}>
      <div className="product overflow-hidden p-4">
        <div className="d-flex justify-content-end mb-3">
          <div
            className="d-block"
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
          >
            {wishListIdArr.includes(product.id)  ? <div
                className="fa-solid fa-heart fs-1"
                style={{ color: "red" }}
                onClick={() => {getWishlist();checkWishlist(product.id)}}
              ></div> : 
              !hover ? (
                <div className="fa-regular fa-heart fs-1 "></div>
              ) : (
                <div
                  className="fa-solid fa-heart fs-1"
                  style={{ color: "red" }}
                  onClick={() => {getWishlist();checkWishlist(product.id)}}
                ></div>
              )}  
              
              
           
          </div>
        </div>
      <>
          <Link to={"/productDetails/" + product.id} className="custom-link">
          <img className="w-100" src={product.imageCover} />
          <h3 className="fw-bold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <h5 className="font-sm text-main">{product.category.name}</h5>
          <div className="d-flex justify-content-between">
            <div>
              <span className="fw-bold ">Price:</span> {product.price} EGP{" "}
            </div>
            <div className="d-flex align-items-center">
              <div className="fa-solid fa-star text-warning me-1"></div>
              <div>{product.ratingsAverage}</div>
            </div>
          </div>
        </Link>
        {product.id == selectedProductId ? <button disabled className="btn-dis btn bg-main text-white w-100 mt-3  "><div className="fas fa-spinner fa-spin"></div></button>:   <button
        className="btn bg-main text-white w-100 mt-3 hover-bright"
        onClick={() => {
          addProductToCart(product.id);
         
        }}
      >
        Add To Cart
      </button>}
      
      </>

        
            
        
      
        
      </div>
    </div>
  );
}
