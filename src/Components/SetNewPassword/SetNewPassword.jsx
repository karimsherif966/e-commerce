import React, { useContext } from 'react'
import { ForgetpasswordContext } from '../../Contexts/ForgetPasswordProvider/ForgetPasswordProvider'
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'

export default function SetNewPassword() {
  let {loading,changePassword,setPassword, setEmail} = useContext(ForgetpasswordContext)
  let validationSchema = Yup.object(
    { password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,'Password must have lowercase letter,uppercase letter,number,special character and with min. length of 8 characters'),}
  )
  let formik = useFormik(
    {
      initialValues:{
        password:'',
      },
      onSubmit: changePassword,
      validationSchema
    }
  )

 
  return (<>
    <div className='p-5'>
    <h3 className='fw-bold'>Enter your email : </h3>
    <input type='email' className='form-control' onKeyUp={(e)=>{setEmail(e.target.value)}}></input>
    <form onSubmit={formik.handleSubmit}>
    <div className='my-4'>
    <h3 className='fw-bold'>Enter new password : </h3>
    <input type='password' className='form-control'  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' onKeyUp={(e)=>{setPassword(e.target.value)}}/>
    {formik.errors.password && formik.touched.password ? 
       <div className='alert alert-danger'>
        <p>{formik.errors.password}</p>
      </div> : null}
    </div>
    </form>
   {loading?  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' disabled> 
        <div className='fas fa-spin fa-spinner'></div>
    </button></div> :  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' onClick={changePassword}>
        Verify 
    </button></div>}
  </div>
  </>
  )
}
