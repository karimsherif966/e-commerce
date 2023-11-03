import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


export const ForgetpasswordContext = createContext()
export default function ForgetPasswordProvider({children}) {
    let [email,setEmail] = useState('')
    let navigate = useNavigate()
    let [loading,setLoading] = useState(false)
    let [code,setCode] = useState('')

    async function forgetPassword(){
        try {
        setLoading(true)
        let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{'email':email})
        navigate('/resetPassword')
        setLoading(false)
         } 
        catch(err) {
         toast.error(err.response.data.message,{duration:1000})
        }
        setLoading(false)
       }

    async function resetPassword(){
        
        try {
        setLoading(true)
        let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{"resetCode":code})
        navigate('/setNewPassword')
        setLoading(false)
         } 
        catch(err) {
         toast.error(err.response.data.message,{duration:1000})
        }
        setLoading(false)

       }


  return (
   <ForgetPasswordProvider value={{
    forgetPassword,
    resetPassword,
    loading,
    setCode,
    setEmail

   }}>
    {children}
   </ForgetPasswordProvider>
  )
}
