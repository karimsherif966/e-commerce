import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let [isLoading, setIsLoading] = useState (false)
  let [errorMessage, setErrorMessage] = useState ('')
  let navigate = useNavigate()

  async function register(values){
    setErrorMessage('')
    setIsLoading(true)
    let { data} = await axios.post ('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setIsLoading(false)
      setErrorMessage(err.response.data.message)
    })
    setIsLoading(false)
    navigate('/login')

  }

 

  let validationSchema = Yup.object(
    {
      name: Yup.string().min(3,"Min length must be greater than 3 characters").max(20,'Max length must be less than 20 characters').required('Name is required'),
      email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Invalid email address'),
      password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,'Password must have lowercase letter,uppercase letter,number,special character and with min. length of 8 characters'),
      phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Enter valid Egyptian phone number"),
      rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],"Password and repassword doesn't match")

    }
  )


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },

    onSubmit: register,
    validationSchema
  })

  return (
    <>
    <div className='my-5'>
    
    <div className='w-75 m-auto'>
    <h1 className='my-3'>Register Now:</h1>
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor='name' className='mb-1'>Name :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}  className='form-control mb-3' type='text' name='name' id='name'/>
       {formik.errors.name && formik.touched.name ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.name}</p>
      </div> : null}

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

      <label htmlFor='rePassword' className='mb-1'>Re-password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}  className='form-control mb-3' type='password' name='rePassword' id='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.rePassword}</p>
      </div> : null}

      <label htmlFor='phone' className='mb-1'>Phone :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}  className='form-control mb-3' type='tel' name='phone' id='phone'/>
      {formik.errors.phone && formik.touched.phone ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.phone}</p>
      </div> : null}

      {errorMessage?<div className='alert alert-danger'>
        {errorMessage}
      </div>: null }
     {!isLoading?  <button disabled={isLoading} className='btn bg-main text-white hover-bright d-block ms-auto'type='submit'>Register </button>:
      <button disabled className='btn bg-main text-white hover-bright d-block ms-auto'type='submit'> <i className='fas fa-spinner fa-spin'></i> </button>
     }


      
    </form>





    </div>
    

    </div>
    
    
    
    </>
  )
}
