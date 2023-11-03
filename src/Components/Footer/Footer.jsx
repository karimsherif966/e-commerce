import React from 'react'

export default function Footer () {
  return (
    <>
    <footer>
    <div className="container py-5">
      <h5 className='fw-bold'>Get the FreshCart app</h5>
      <p className='text-grey fs-7 fw-medium'>We will send you a link, open it on your phone to download the app.</p>
      <div className='row gy-3'>
        <div className="col-md-10">
        <input type='email' name='email' placeholder='Email ..' className='form-control '></input>
        </div>
        <div className="col-md-2">
        <button className='btn bg-main text-white fs-7 hover-bright'>Share App Link</button>
        </div>



      </div>

      </div>
    </footer>




   
    
    
    
    </>
  )
}
