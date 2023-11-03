import React, { useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../Loadingscreen/LoadingScreen";
import toast from "react-hot-toast";
import { useContext } from "react";
import { WishListContext } from "../../Contexts/WishListContextProvider";

export default function WishList() {
  let{getWishlist,deleteFromWishlsit,loading,setLoading, wishListProducts} = useContext(WishListContext)

  useEffect(() => {
    getWishlist();
  },);

 

  async function addProductToCart(productId) {
    setLoading(true);
    deleteFromWishlsit(productId);
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
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
    }
    getWishlist();
    setLoading(false);
  }


  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : wishListProducts.length === 0 ? (
        <div className=" text-center p-4 alert alert-danger my-5 text-black fw-bold fs-5">
          <p>No products at Wishlist</p>
        </div>
      ) : (
        wishListProducts.map((product) => (
          <div className="bg-light my-3 p-3 row" key={product.id}>
            <div className="col-md-2">
              <img src={product.imageCover} className="w-100" alt=""/>
            </div>
            <div className="col-md-3 d-flex justify-content-center flex-column  ">
              <p className="fw-bold  fs-5">{product.title}</p>
              <p className="text-main fw-bold">{product.price} EGP</p>
              <div
                className="d-flex text-danger cursor-pointer hover-bright "
                onClick={() => {deleteFromWishlsit(product.id);getWishlist()}}
              >
                <div class="fa-solid fa-trash mt-1 me-1 "></div>
                <p>Remove</p>
              </div>
            </div>
            <div>
              <button
                className="btn bg-main text-white hover-bright d-block ms-auto"
                onClick={() => addProductToCart(product.id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
