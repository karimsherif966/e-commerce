import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Product from "../Product/Product";
import LoadingScreen from "../Loadingscreen/LoadingScreen";
import MainSlider from "./MainSlider/MainSlider";
import { WishListContext } from "../../Contexts/WishListContextProvider";
import { AuthContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {
  let [searchBar, setSearchBar] = useState("");
  let {getWishlist} = useContext(WishListContext)
  let {isUserLoggedIn} = useContext (AuthContext)


  

  
  function getProducts() {
    try {
      
      return axios.get("https://ecommerce.routemisr.com/api/v1/products");
     } catch (err){
      toast.error("there is problem in the server , Try again ! ")
     }
  }

  let { data, isLoading } = useQuery("products", getProducts, {
    cacheTime: 10000,
    staleTime: 10000,
  });
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [])
  
  useEffect(()=>{
    if (isUserLoggedIn){getWishlist()}
  })

  

  useEffect(() => {
    if (isLoading === true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);
  const search = (event) => {
    setSearchBar(event.target.value);
  };

  return (
    <>
        <Helmet>
          <title>Home</title>
        </Helmet>
      {!loading ? (
        <div>
          <MainSlider />
          <div>
            <input
              type="search"
              placeholder="Search"
              className="form-control w-75 m-auto mt-5"
              onKeyUpCapture={search}
            ></input>
          </div>

          <div className="row pt-5">
            {searchBar === ""?
               data?.data.data.map((product) => (
                  <Product key={product.id} product={product} />
                )
                
                
                )
                
              : data?.data.data
                  .filter((product) =>
                    product.title
                      .toLowerCase()
                      .includes(searchBar.toLocaleLowerCase())
                  )
                  .map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
