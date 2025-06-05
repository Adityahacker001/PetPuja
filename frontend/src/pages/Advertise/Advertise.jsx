import React from 'react'
import { assets } from '../../assets/assets'
import './Advertise.css'
import { Link, useNavigate } from 'react-router-dom';

const Advertise = () => {
  
  return <>

    <div className='whole'>
      <div className='contain1'>
        <div className='img'>
            {/* <img src={assets.resbanner} /> */}
        </div>
      
      <p className='t1'>Partner with chieffood</p>
      <p>at 0% commission for the 1st month!</p>
      <p className='detail'>And get ads worth INR 1500. Valid for new restaurant partners in select cities.</p>
      <Link to='http://localhost:5174/'><button className='btn1'>Register your restaurant</button></Link>
      <Link to='http://localhost:5174/'><button className='btn2'>Login to view your existing restaurant</button></Link>
      </div>
      <div className='contain2'>
        <div className='contain2_2'>
          <p className='tg1'>Get started with online ordering</p>
          <p className='tg2'>Please keep the documents ready for a smooth signup</p>
          <div className='box1'>
            <div className='box11'>
              <span><img src={assets.tick} /><p>FSSAI license copy</p></span>
              <span><img src={assets.tick} /><p>Regular GSTIN</p></span>
              <span><img src={assets.tick} /><p>Your restaurant menu</p></span>
            </div>
            <div className='box12'>
              <span><img src={assets.tick} /><p>PAN card copy</p></span>
              <span><img src={assets.tick} /><p>Bank account details</p></span>
              <span><img src={assets.tick} /><p>Dish images for top items</p></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>

}

export default Advertise