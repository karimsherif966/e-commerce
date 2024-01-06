import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Product from '../Product/Product'
import LoadingScreen from '../Loadingscreen/LoadingScreen'
import { Helmet } from 'react-helmet'

export default function Products() {

  let [searchBar, setSearchBar] = useState('')

  function getProducts(){
   
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    
  }

  let{data,isLoading}=useQuery('products',getProducts,{
    cacheTime:1000,
      
  })
  let[loading,setLoading]= useState(false)
  useEffect(()=>{
    if(isLoading===true){
        setLoading(true)
      } else{
        setLoading(false)
      }
},[isLoading])

  useEffect(()=>{
    getProducts();
  },[])

  

  const search = (event) => {
    setSearchBar(event.target.value)
  }




  return (<>
    <Helmet>
          <title>Products</title>
        </Helmet>
    {!loading?  
    
     <div>
      <div>
        <input type='search' placeholder='Search' className='form-control w-75 m-auto mt-5' onKeyUpCapture={search}></input>
      </div>
      
     <div className='row pt-5'>
     {searchBar === ''? 
     data?.data.data.map((product)=>
      <Product key={product.id} product={product}/>) : 
      
      data?.data.data.filter((product)=>product.title.toLowerCase().includes(searchBar.toLocaleLowerCase())).map((product)=>
        <Product key={product.id} product={product}/>
       )

      }
     </div> 
     </div>
     
        : <LoadingScreen/>}
    </>
    
    )
}





  