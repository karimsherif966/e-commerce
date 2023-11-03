import { createContext , useState , useEffect } from "react";



  export const AuthContext = createContext()

  export default function AuthContextProvider({children}){
    let [isUserLoggedIn, setIsUserLoggedin] = useState(false)
  useEffect(()=>{
    if (localStorage.getItem('token')!=null){
      setIsUserLoggedin(true)
    } else{
      setIsUserLoggedin(false)
    }
   

  },[])

   return <AuthContext.Provider value={{isUserLoggedIn,setIsUserLoggedin}}>
    {children}
    </AuthContext.Provider>
  }