import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContextProvider";

export default function Cart() {
  let {
    cartProducts,
    error,
    isLoading,
    cartId,
    totalCartPrice,
    removeCartItem,
    clearCart,
    updateProductCount
  } = useContext(CartContext);

  // useEffect(() => {
  //   getUserCart();
  // }, []);

 console.log(cartProducts[0])

  return (
    <>
      {error ? (
        <div className=" text-center p-4 alert alert-danger my-5 text-black fw-bold fs-5">
          <p>No products at this cart</p>
        </div>
      ) : isLoading ? (
        <div className="py-5 my-5 text-center">
          <i className="fas fa-spin fa-spinner" />
        </div>
      ) : cartProducts.length > 0 ? (
        <>
          <button
            className="btn btn-outline-danger d-block ms-auto mt-3 pt-3"
            onClick={clearCart}
          >
            <p>Clear Cart</p>
          </button>
          {cartProducts?.map((product, index) => {
            
            return (
              <>
                <div
                  key={product?.product.id}
                  className="row align-items-center p-2 my-4 shadow"
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
                        <div>
                          <button
                            className="btn  btn-outline-danger"
                            onClick={() => removeCartItem(product?.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          {product.count == 1 ? (
                            <button
                              disabled
                              className="btn bg-main text-white mx-2"
                              onClick={() =>
                                updateProductCount(
                                  product?.product.id,
                                  product.count - 1,
                                  index
                                )
                              }
                            >
                              -
                            </button>
                          ) : (
                            <button
                              className="btn bg-main text-white mx-2"
                              onClick={() =>
                                updateProductCount(
                                  product.id,
                                  product.count - 1,
                                  index
                                )
                              }
                            >
                              -
                            </button>
                          )}

                          <span>{product.count}</span>
                          <button
                            className="btn bg-main text-white mx-2"
                            onClick={() =>
                              updateProductCount(
                                product?.product.id,
                                product.count + 1,
                                index
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <Link to={"/checkout/" + cartId}>
            <div>
              <button className="btn bg-main text-white hover-bright">
                Check Out
              </button>
            </div>
          </Link>
        </>
      ) : (
        <div className=" text-center p-4 alert alert-danger my-5 text-black fw-bold fs-5">
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
