import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../assests/photos/freshcart-logo.svg'
import { AuthContext } from '../../Contexts/AuthContext'
import { CartContext } from '../../Contexts/CartContextProvider'

export default function Navbar() {
  let {isUserLoggedIn , setIsUserLoggedin} = useContext (AuthContext)
  let {numOfCarts} = useContext(CartContext)
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid px-5">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
          <Link className="nav-a active nav-link nav-item " aria-current="page" to={"/home"}><img src={img1} className='w-90' /></Link>
        
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bolder">
        <ul className='navbar-nav'>
       <li className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover" aria-current="page" to={"/home"}>Home</Link>
        </li>
      
       {isUserLoggedIn ? <li className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover" aria-current="page" to={"/wishlist"}>Wishlist</Link>
        </li> : null}
        <li className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover" aria-current="page" to={"/products"}>Products</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover" aria-current="page" to={"/categories"}>Categories</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover" aria-current="page" to={"/brands"}>Brands</Link>
        </li>
       </ul> 
       
      </ul>
      <div className='d-flex gap-1 navbar-nav fw-bolder'>
       {isUserLoggedIn?  <div className='d-flex gap-3 mt-1 me-1'>
        
        <li className="nav-item ">
          <Link className="nav-a active nav-link  fa-solid fa-cart-shopping pt-2 fs-3" aria-current="page" to={"/cart"}><span className='num-of-carts p-2 text-white bg-main'>{numOfCarts}</span></Link>
        </li>
        </div> : ''}
    
         {isUserLoggedIn?  <div className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover fs-6 pt-3" aria-current="page" to={"/login"} onClick={()=>{setIsUserLoggedin(false); localStorage.removeItem('token')}}>Logout</Link>
        </div> : <div className='d-flex  gap-1'>
         <div className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover fs-7 " aria-current="page" to={"/register"}>Register</Link>
        </div>
         <div className="nav-item ">
          <Link className="nav-a active nav-link text-grey black-hover fs-7" aria-current="page" to={"/login"}>Login</Link>
        </div>
       
         </div>}
      </div>
     
    </div>
  </div>
</nav>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
