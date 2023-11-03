import './App.css';
import React from 'react';
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Orders from './Components/Orders/Order'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Checkkout from './Components/Checkkout/Checkkout'
import WishList from './Components/WishList/WishList'

import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../src/ProtectedRoute/ProtectedRoute';
import ProtectedLoginRoute from '../src/ProtectedLoginRoute/ProtectedLoginRoute';
import ProductDetails from './Components/Product/ProductDetails/ProductDetails';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SetNewPassword from './Components/SetNewPassword/SetNewPassword';






function App() {
  let routers = createBrowserRouter([
    {path: '', element:<Layout/>,children:[
      {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'login',element:<ProtectedLoginRoute><Login/></ProtectedLoginRoute> },
      {path:'register',element:<ProtectedLoginRoute><Register/></ProtectedLoginRoute> },
      {path:'forgotPassword',element:<ProtectedLoginRoute><ForgotPassword/></ProtectedLoginRoute> },
      {path:'resetPassword',element:<ProtectedLoginRoute><ResetPassword/></ProtectedLoginRoute> },
      {path:'setNewPassword',element:<ProtectedLoginRoute><SetNewPassword/></ProtectedLoginRoute> },

      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute> },
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute> },
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'checkout/:id',element:<ProtectedRoute><Checkkout/></ProtectedRoute> },
      {path:'orders',element:<ProtectedRoute><Orders/></ProtectedRoute> },
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



