import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import LoadingScreen from '../Loadingscreen/LoadingScreen'
import { useState } from 'react'

export default function Categories() {
   
  useEffect(()=>{
    getCategories()
  },[])
   
  function getCategories(){
   
   let res = axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   
   
   return res;
  }
  let{data,isLoading} = useQuery('categories',getCategories,{
    cacheTime:300000,
    staleTime:1000
  })
  console.log(data)

  let[loading,setLoading]= useState(false)
  function checkLoading(){
    if(isLoading===true){
      setLoading(true)
    } else{
      setLoading(false)
    }

  }
  useEffect(()=>{
   checkLoading()
},[isLoading])
  

  return (<>
  
  {!loading ? (
  <div className='row pt-5'>
    {data?.data.data.map((category) => (
     <div className='col-md-4 pb-4 '>
       <div className="col-md-12 card category-card shadow">
        <div className>
          <img src={category.image} style={{ width:'100%', height:'400px' }} alt=''></img>
          <h5 className='text-center text-main fw-bold my-4 fs-3'>{category.name}</h5>
        </div>
      </div>
      </div>
    ))}
  </div>
) : (
  <LoadingScreen/>
)}
  </>
)
}





