import React from 'react'
import img1 from '../../../assests/photos/slide 3.jpeg'
import img2 from '../../../assests/photos/slide 5.jpeg'
import img3 from '../../../assests/photos/slide 1.jpg'
import img4 from '../../../assests/photos/slide 2.jpg'
import img5 from '../../../assests/photos/slide 4.jpeg'
import Slider from 'react-slick'


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay:true,
        autoplaySpeed:3000,
       
      };
      
  return (
  <div className='row pt-4 gx-0 d-flex justify-content-center'>
      <div className='col-md-3 pb-5'>
      <Slider {...settings}>
        <img src={img2} height={400} className='w-100 ms-auto d-block ' alt=''/>
        <img src={img1} height={400}  className='w-100 ms-auto d-block ' alt=''/>
        <img src={img5} height={400}  className='w-100 ms-auto d-block ' alt=''/>
      </Slider>
      </div>

      <div className='col-md-3'>
      <img src={img3} height={200}  className='w-100' alt=''/>
        <img src={img4} height={200}  className='w-100' alt=''/>
      </div>

      
      </div>
  )
}
