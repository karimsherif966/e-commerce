import './App.css';
import { Helmet } from 'react-helmet';
import React from 'react';
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Checkkout from './Components/Checkkout/Checkkout'
import WishList from './Components/WishList/WishList'

import { RouterProvider , createBrowserRouter, createHashRouter } from 'react-router-dom';
import ProtectedRoute from '../src/ProtectedRoute/ProtectedRoute';
import ProtectedLoginRoute from '../src/ProtectedLoginRoute/ProtectedLoginRoute';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SetNewPassword from './Components/SetNewPassword/SetNewPassword';






function App() {
  let routers = createHashRouter([
    {path: '', element:<Layout/>,children:[
      {path:'',element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'login',element:<ProtectedLoginRoute><Login/></ProtectedLoginRoute> },
      {path:'register',element:<ProtectedLoginRoute><Register/></ProtectedLoginRoute> },
      {path:'forgotPassword',element:<ProtectedLoginRoute><ForgotPassword/></ProtectedLoginRoute> },
      {path:'resetPassword',element:<ProtectedLoginRoute><ResetPassword/></ProtectedLoginRoute> },
      {path:'setNewPassword',element:<ProtectedLoginRoute><SetNewPassword/></ProtectedLoginRoute> },

      {path:'productDetails/:id',element:<ProductDetails/> },
      {path:'products',element:<Products/> },
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute> },
      {path:'categories',element:<Categories/> },
      {path:'brands',element:<Brands/> },
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'checkout/:id',element:<ProtectedRoute><Checkkout/></ProtectedRoute> },
      {path:'*',element:<NotFound/>},
    ]}

  ])
  
  
  return(<>   
   <RouterProvider router={routers}>
    
    <Layout/>
   </RouterProvider>  
   

    </>
  )
  
}

export default App;



