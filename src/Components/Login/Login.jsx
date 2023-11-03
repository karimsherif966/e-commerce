import React, { useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Login() {


  let [isLoading, setIsLoading] = useState (false)
  let [errorMessage, setErrorMessage] = useState ('')
  let navigate = useNavigate()
  let { setIsUserLoggedin} = useContext (AuthContext)

  async function login(values){
    setErrorMessage('')
    setIsLoading(true)
    let { data} = await axios.post ('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      setIsLoading(false)
      setErrorMessage(err.response.data.message)
    })
    setIsUserLoggedin(true)
    localStorage.setItem("token",data.token)
    setIsLoading(false)
    navigate('/home')

  }

   let validationSchema = Yup.object(
    {
      email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Invalid email address'),
      password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,'Password must have lowercase letter,uppercase letter,number,special character and with min. length of 8 characters'),
    }
  )


  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },

    onSubmit: login,
    validationSchema
  })

  return (
    <>
    <div className='my-5'>
    
    <div className='w-75 m-auto'>
    <h1 className='my-3'>login Now:</h1>
    <form onSubmit={formik.handleSubmit}>

    

      <label htmlFor='email' classemail='mb-1'>Email :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  className='form-control mb-3' type='email' name='email' id='email'/>
      {formik.errors.email && formik.touched.email ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.email}</p>
      </div> : null}

      <label htmlFor='password' className='mb-1'>Password :</label>
      <input onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.password} className='form-control mb-3' type='password' name='password' id='password'/>
      {formik.errors.password && formik.touched.password ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.password}</p>
      </div> : null}


      {errorMessage?<div className='alert alert-danger'>
        {errorMessage}
      </div>: null }
     {!isLoading?
     <div className='d-flex '>
     <div className='forgot-btn'><button className='btn rounded-5 border fw-bold px-4 '> <Link className='custom-link' to={'/forgotPassword'}>Forgot password?</Link></button></div>
     <button disabled={isLoading} className='btn bg-main text-white hover-bright d-block ms-auto'type='submit'>login </button>
     </div>
     :
      <button disabled className='btn bg-main text-white hover-bright d-block ms-auto'type='submit'> <i className='fas fa-spinner fa-spin'></i> </button>
     }


      
    </form>





    </div>
    

    </div>
    
    
    
    </>
  )
}
