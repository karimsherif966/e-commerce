import React from 'react'

export default function Footer () {
  return (
    <>
    <footer>
    <div className="container py-5">
      <h5 className='fw-bold '>Get the FreshCart app</h5>
      <p className='fs-7 fw-medium'>We will send you a link, open it on your phone to download the app.</p>
      <div className='row gy-3'>
        <div className="col-md-10">
        <input type='email' name='email' placeholder='Email ..' className='form-control '></input>
        </div>
        <div className="col-md-2">
        <button className='btn bg-main text-white fs-7 hover-bright'>Share App Link</button>
        </div>



      </div>
     <div className='d-flex justify-content-center'>
      <div className='line'></div>
     </div>
     <div className='d-flex gap-3 justify-content-center mt-5'>
      <a className='cursor-pointer ' href='https://www.facebook.com/' target='_blank' rel="noopener"> <div className="fa-brands fa-facebook pt-3 text-black fs-4 contact-icons "></div> </a>
        <a className='cursor-pointer' href='https://twitter.com/' target='_blank' rel="noopener"> <div className="fa-brands fa-twitter pt-3 text-black fs-4 contact-icons"></div> </a>
        <a className='cursor-pointer' href='https://www.linkedin.com/' target='_blank' rel="noopener"> <div className="fa-brands fa-linkedin pt-3 text-black fs-4 contact-icons"></div> </a>
        <a className='cursor-pointer' href='https://www.youtube.com/' target='_blank' rel="noopener"> <div className="fa-brands fa-youtube pt-3 text-black fs-4 contact-icons"></div> </a>
        <a className='cursor-pointer' href='https://www.instagram.com/' target='_blank' rel="noopener"> <div className="fa-brands fa-instagram pt-3 text-black fs-4 contact-icons"></div> </a>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <p className='fs-7'> ©Copyright. All rights reserved</p>
      </div>
     
      </div>
    </footer>




   
    
    
    
    </>
  )
}
