import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../../../Contexts/CartContextProvider'
import LoadingScreen from '../../Loadingscreen/LoadingScreen'

export default function ProductDetails() {
    let {addProductToCart , selectedProductId} = useContext(CartContext)

    
 

  
    let {id}=useParams()
    let [productDetails, setProductDetails] = useState()
    let [isLoading, setIsLoading] = useState (false)


    async function getProductDetails(productId){
        setIsLoading(true)
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId)
        setIsLoading(false)
        setProductDetails(data.data)
        console.log(data.data)
    }

    useEffect(()=>{
        getProductDetails(id)
    }, [])


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
  
  <div>
   <Helmet>
                
    <title>{productDetails?.title.split(" ").slice(0,2).join(" ")}</title>
    </Helmet>
  {!isLoading?  <div>
    <div className='row align-items-center py-5'>
        <div className='col-md-3 mb-5'>
           
            <Slider {...settings}>
                {productDetails?.images.map((image)=>{
                    return <img key={image} className='w-100' src={image} alt=''/>

                })}
      
            </Slider>
  
        </div>
        <div className='col-md-9'>
            <h1>{productDetails?.title}</h1>
            <h5>{productDetails?.category.name}</h5>
            <p>{productDetails?.description}</p>
            <p className='fw-bold fs-6'><span >Price:</span> {productDetails?.price} </p>
            <p><div className='fas fa-star text-warning'></div> {productDetails?.ratingsAverage} </p>
            {id== selectedProductId ? <button disabled className="btn bg-main text-white w-100 mt-3  "><div className="fas fa-spinner fa-spin"></div></button>:   <button
        className="btn bg-main text-white w-100 mt-3 hover-bright"
        onClick={() => {
          addProductToCart(id);
         
        }}
      >
        Add To Cart
      </button>}
            
            
        </div>


    </div>
    </div> :<LoadingScreen/>}














  </div>
   
  )
}
