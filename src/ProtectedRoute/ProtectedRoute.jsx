import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import Login from '../Components/Login/Login'


export default function ProtectedRoute({children}) {
    let {isUserLoggedIn } = useContext (AuthContext)
    if(isUserLoggedIn){
        
        return children
        
        

    } else{
        
        return <Login/>
    }

  
}
