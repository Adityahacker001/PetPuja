import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const LoginPopup = ({setAdminLogin}) => {

  const navigate = useNavigate();
  const {setToken,toggleVisibility,isVisible}=useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const url = "http://localhost:4000"
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    restaurantName: "",
    city:"",
    country:"",
    deliveryPrice:0,
    estimatedDeliveryTime : 0
  })



  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  
  const onlogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/admin/login"
      navigate("/")
    }
    else {
      newUrl += "/api/admin/register"
      navigate("/")
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setAdminLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }
  
  return <>
    {/* <div>
      <button onClick={toggleVisibility}>Toggle Visibility</button>
      {isVisible && <div>This content is visible</div>}
    </div> */}
    {isVisible && <div className='login-popup'>
      
       <form onSubmit={onlogin} className="login-popup-container">
          <div className="login-popup-title">
              <h2>{currState}</h2> <span className='close' onClick={toggleVisibility}>x</span>
              <img onClick={()=>setAdminLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
          {currState === "Login" ? <>
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          </> : <>
              <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
              <input name='restaurantName' onChange={onChangeHandler} value={data.restaurantName} type="text" placeholder='Your Restaurant Name' required />
              <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
              <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
              <label for="quantity">Delivery Price / Charges :</label>
              <input id="quantity" name='deliveryPrice' onChange={onChangeHandler} value={data.deliveryPrice} type="Number" min="10" required />
              <label for="quantity">Estimated Delivery Time (in min) :</label>
              <input id="quantity" name='estimatedDeliveryTime' onChange={onChangeHandler} value={data.estimatedDeliveryTime} type="Number"  min="30" required />
          </>
            }
               
               
          {/* <input type="reset" value="Reset"></input> */}
          </div>
          <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
          <div className="login-popup-condition">
            <input className='cursor' type="checkbox" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div> 
        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
          }
       </form>
    </div>}
    
  </>
}

export default LoginPopup