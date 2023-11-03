import React, { useContext } from 'react'
import { ForgetpasswordContext } from '../../Contexts/ForgetPasswordProvider/ForgetPasswordProvider'

export default function ResetPassword() {
   
  let { setCode, loading, resetPassword} = useContext(ForgetpasswordContext)
  
  return (<>
    <div className='p-5'>
    <h3 className='fw-bold'>Enter the code sent to your email : </h3>
    <input type='email' className='form-control w-50' onKeyUp={(e)=>{setCode(e.target.value)}}></input>
    {loading?  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' disabled> 
        <div className='fas fa-spin fa-spinner'></div>
    </button></div> :  <div className='forgot-btn mt-3'><button className='btn rounded-5 border fw-bold px-4 ' onClick={resetPassword}>
        Verify 
    </button></div>}
    </div>
     </>
   
 
  )
}
