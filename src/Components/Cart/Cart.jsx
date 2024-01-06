import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContextProvider";
import { useEffect } from "react";
import LoadingScreen from "../Loadingscreen/LoadingScreen";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import { Helmet } from "react-helmet";


export default function Cart() {
  const[isEnter, setIsEnter] = useState(true)

  let {
    cartProducts,
    error,
    load,
    cartId,
    totalCartPrice,
    removeCartItem,
    clearCart,
    updateProductCount,
    getUserCart,
    waitToDelete,
    selectedProductId,
    waitToChangeCount,
    sign,
  } = useContext(CartContext);

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <>
      <Helmet>
          <title>Cart</title>
        </Helmet>
      {error ? (
        <div>
          <div className=" text-center p-4 alert alert-danger text-black fw-bold fs-5 no-product-found">
          <p>No products at this cart</p>
        </div>
        </div>
      ) : load ? (
        <LoadingScreen />
      ) : cartProducts.length > 0 ? (
        <>
          <button
            className="btn btn-outline-danger d-block ms-auto mt-3 pt-3"
            onClick={clearCart}
          >
            <p>Clear Cart</p>
          </button>
        <TransitionGroup>
          {cartProducts?.map((product, index) => {
             
           return(
            
            <CSSTransition
            in={isEnter}
            timeout={1000}
            classNames="fade-out"
            key={product?.product.id}
            
            >
              
                <div
                  key={product?.product.id}
                  
                  className="row align-items-center p-2 my-4 shadow "
                >
                  <div className="col-md-2">
                    <img className="w-100" src={product.product.imageCover} />
                  </div>
                  <div className="col-md-10">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h3>{product.product.title}</h3>
                        <p className="fw-bolder">Price: {product.price}</p>
                        <p>
                          <div className="fas fa-star text-warning"></div>{" "}
                          {product.product.ratingsAverage}
                        </p>
                      </div>
                      <div>
                        {waitToDelete &&
                        product?.product.id === selectedProductId ? (
                          <div className="text-center loading-screen">
                            <i className="fas fa-spin fa-spinner" />
                          </div>
                        ) : (
                          <div>
                            <button
                              className="btn  btn-outline-danger"
                              onClick={() =>{
                                removeCartItem(product?.product.id);
                                setIsEnter((v)=>!v);
                              }
                              }
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        <div className="d-flex align-items-center mt-3">
                          {product.count === 1 ? (
                            <button
                              disabled
                              className="btn bg-main text-white mx-2"
                            >
                              -
                            </button>
                          ) : ( 
                            waitToChangeCount && product?.product.id == selectedProductId && sign==='-' ? <button className=" btn bg-main text-white mx-2" disabled>
                            
                            
                            <i className="fas fa-spin fa-spinner" />
                          </button> :
                            <button
                              className="btn bg-main text-white mx-2"
                              disabled={
                                waitToDelete &&
                                product?.product.id === selectedProductId || waitToChangeCount && product?.product.id === selectedProductId && sign==='-'
                              }
                              onClick={() =>
                                updateProductCount(
                                  product?.product.id,
                                  product.count - 1,
                                  index,
                                  '-',
                                )
                              }
                            >
                              -
                            </button>
                          )}

                          <span>{product.count}</span>
                         { waitToChangeCount && product?.product.id === selectedProductId && sign==='+' ? <button className=" btn bg-main text-white mx-2" disabled>
                            
                            
                            <i className="fas fa-spin fa-spinner" />
                          </button> :
                          <button
                            className="btn bg-main text-white mx-2"
                            disabled={
                              waitToDelete &&
                              product?.product.id === selectedProductId || waitToChangeCount && product?.product.id === selectedProductId && sign==='+'
                            }
                            onClick={() =>
                              updateProductCount(
                                product?.product.id,
                                product.count + 1,
                                index,
                                '+'
                              )
                            }
                          >
                            +
                          </button>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </CSSTransition>
                
               
              
              
              
            )
            
          })}
          </TransitionGroup>
         
          <Link to={"/checkout/" + cartId}>
            <div>
              <button className="btn bg-main text-white hover-bright">
                Check Out
              </button>
            </div>
          </Link>
        </>
      ) : (
        <div className=" text-center p-4 alert alert-danger text-black fw-bold fs-5 no-product-found">
          <p>No products at this cart</p>
        </div>
      )}

      <div className="text-end">
        <h5>
          <span className="fw-bold">Total Cart Price</span>: {totalCartPrice}{" "}
          <span>EGP </span>
        </h5>
       
      </div>
    </>
  );
}
