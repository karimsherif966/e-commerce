import React from 'react'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Checkkout() {
  let{id} = useParams()

  function checkout(shippingAddress){
    fetchCheckout(shippingAddress)
  }

  async function fetchCheckout(shippingAddress){
    let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
      
    shippingAddress : shippingAddress
    },{
      headers:{
      
      token: localStorage.getItem('token')
      }
    })

    window.location.href= res.data.session.url;
    console.log(res)
  }


    let [isLoading, setIsLoading] = useState (false)
    let validationSchema = Yup.object(
        {
          phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Enter valid Egyptian phone number"),
          details: Yup.string().required("Details are required"),
          city: Yup.string().required("City is required")
        }
      )
    
    
      let formik = useFormik({
        initialValues:{
          details:'',
          phone:'',
          city:'',
        },
    
        onSubmit: checkout,
        validationSchema
      })
    
      return (
        <>
        <div className='my-5'>
        
        <div className='w-75 m-auto'>
        <h1 className='my-3'>Register Now:</h1>
        <form onSubmit={formik.handleSubmit}>
    
          <label htmlFor='details' className='mb-1'>Details :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details}  className='form-control mb-3' type='text' name='details' id='details'/>
          {formik.errors.details && formik.touched.details ? 
           <div className='alert alert-danger'>
            <p>{formik.errors.details}</p>
          </div> : null}
    
          <label htmlFor='city' classemail='mb-1'>City:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city}  className='form-control mb-3' type='text' name='city' id='city'/>
          {formik.errors.city && formik.touched.city ? 
           <div className='alert alert-danger'>
            <p>{formik.errors.city}</p>
          </div> : null}
    
          
    
          <label htmlFor='phone' className='mb-1'>Phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}  className='form-control mb-3' type='tel' name='phone' id='phone'/>
          {formik.errors.phone && formik.touched.phone ? 
           <div className='alert alert-danger'>
            <p>{formik.errors.phone}</p>
          </div> : null}
    
         
      <button className='btn bg-main text-white hover-bright d-block ms-auto'type='submit'>Order </button>:
         
         
    
    
          
        </form>
    
    
    
    
    
        </div>
        
    
        </div>
        
        
        
        </>
      )
}
