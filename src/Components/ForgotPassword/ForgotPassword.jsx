import React, { useContext} from 'react'
import { ForgetpasswordContext } from '../../Contexts/ForgetPasswordProvider/ForgetPasswordProvider'
export default function ForgotPassword() {
  
   let{setEmail,loading,forgetPassword} = useContext(ForgetpasswordContext)


  return (<>
  
  <div className='p-5'>
    <h3 className='fw-bold'>Enter your email : </h3>
    <input type='email' className='form-control' onKeyUp={(e)=>{setEmail(e.target.value)}}></input>
   {loading?  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' disabled> 
        <div className='fas fa-spin fa-spinner'></div>
    </button></div> :  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' onClick={forgetPassword}>
        Verify 
    </button></div>}
  </div>
  </>
    
  )
}
