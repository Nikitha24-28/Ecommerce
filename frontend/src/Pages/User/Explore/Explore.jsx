import React from 'react';
import './Explore.css';
import img from '../../../assets/images/statement.png';

const Explore = () => {
  return (
    <div className='explorepage'>
      <div>
        <img className="img1" src="https://images-na.ssl-images-amazon.com/images/S/stores-image-uploads-eu-prod/9/AmazonStores/A21TJRUUN4KGV/6f9d41a4c4a40c77ffb42b9ef5029eb6.w3000.h1500._CR0%2C0%2C3000%2C1500_.jpg"/>
      </div>
      <h2 className='shopbycath2'>Shop by Category</h2>
      <div className='shopbycat'>
        <div className='shopskin'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/1707202320-67ef6468516dd5c6.png?crop=center&height=360&v=1707202328&width=480'/>
          <h3>Skin</h3>
        </div>
        <div className='shophair'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/1706099761-f86e95709c7aaba4.png?crop=center&height=360&v=1706099767&width=480'/>
          <h3>Hair</h3>
        </div>
        <div className='shopbody'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/1706099804-80666e6d221da1a8.png?crop=center&height=360&v=1706099810&width=480'/>
          <h3>Body</h3>
        </div>
        <div className='shoplip'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/1707202423-7af38ee9fbec530d.png?crop=center&height=360&v=1707202432&width=480'/>
          <h3>Lip Care</h3>
        </div>
      </div>
      <h2 className='shopbycath2'>Shop by Concern</h2>
      <div className='shopbycat'>
        <div className='shopskin'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/Uneven_Tone_or_Pigmentation-min.png?crop=center&height=360&v=1710248322&width=480'/>
          <h3>Uneven Tone</h3>
        </div>
        <div className='shophair'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/Uneven_Tone_or_Pigmentation-min.png?crop=center&height=360&v=1710248322&width=480'/>
          <h3>Acne Control</h3>
        </div>
        <div className='shopbody'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/Oiliness-min.png?crop=center&height=360&v=1710248324&width=480'/>
          <h3>Oilness</h3>
        </div>
        <div className='shoplip'>
          <img src='https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/beminimalist.co/cdn/shop/files/Fine_Lines_Wrinkles-min.png?crop=center&height=360&v=1710248319&width=480'/>
          <h3>Wrinkles</h3>
        </div>
      </div>
      <div className='statement'>
        <h1>The future of personal care is here</h1>
        <p>Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</p>
        <img className ="statementimg"src={img}/>
      </div>
      <div className="footerbox">
        <h3 className="contact">CONTACT </h3>
        <p className="footerp">"Embark on your next adventure with us!"</p>
        <div className="socials">
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-brands fa-twitter"></i></a>
          <a href="#"><i class="fa-brands fa-facebook"></i></a>
          <a href="#"><i class="fa-brands fa-whatsapp"></i></a>            
        </div>
      </div>
    </div>
  )
}

export default Explore;