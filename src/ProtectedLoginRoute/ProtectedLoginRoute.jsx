import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import Home from '../Components/Home/Home'

export default function ProtectedLoginRoute({children}) {
    let {isUserLoggedIn } = useContext(AuthContext)
    if (isUserLoggedIn){
        return <Home/>
    } else {
        return children

    }
 
}

