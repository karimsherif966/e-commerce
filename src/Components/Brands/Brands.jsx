import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoadingScreen from "../Loadingscreen/LoadingScreen";
import swal from "sweetalert";

export default function Brands() {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    getBrands();
  }, []);

  function getBrands() {
    let res = axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return res;
  }

  let { data, isLoading } = useQuery("brand", getBrands, {
    cacheTime: 300000,
    staleTime: 1000,
  });
  console.log(data)
  useEffect(() => {
    if (isLoading === true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  async function displayBrand(id) {
    let res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands/" + id
    );
    console.log(res);
    swal({
      content: {
        element: "img",
        attributes: {
          src: res.data.data.image,
        },
      },

      button: "close",
    });
  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="row pt-5 g-4 pb-5">
            {data?.data.data.map((brand) => (
              <div className="col-md-3">
                <div
                  className="col-md-12 shadow card p-3 category-card"
                  key={brand._id}
                  onClick={() => displayBrand(brand._id)}
                >
                  <div className="w-100">
                    <img src={brand.image} className="w-100" alt=""/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
