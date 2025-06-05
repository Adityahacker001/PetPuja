import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './Home.css'

const Home = () => {
  const [data, setData] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  // // const [name, setName] = useState("")
  // const [id, setId] = useState([])
  // const [restaurantName, setRestaurantName] = useState("")
  // const [city, setCity] = useState("")
  // const [country, setCountry] = useState("")
  // const [deliveryPrice, setDeliveryPrice] = useState()
  // const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState()
  const [change, setChange] = useState({
    // id:"",
    name: "",
    restaurantName: "",
    city: "",
    country: "",
    deliveryPrice: 0,
    estimatedDeliveryTime: 0
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value !== "" || value !== 0) {
      setChange(data => ({ ...data, [name]: value }))
    } 
  }
  const url = "http://localhost:4000"
  const updateData = async () => {
    const response = await axios.post(url + "/api/admin/updateuser", change,{ headers: { token } });
    // const response = await axios.post(url + "/api/admin/updateuser",{ headers: { token } }, name, restaurantName, city, country, deliveryPrice, estimatedDeliveryTime);
    if (response.data.success) {
    }
    else {
      alert(response.data.message)
    }
    
  }

  const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/admin/listadmin");
    setData(response.data.data)
  }
  const loadAdminData = async (token) => {
    const response = await axios.post(url + "/api/admin/getadmin", {}, { headers: { token } })
    setEmail(response.data.emailData)
  } 
  useEffect(() => {
        async function loadData() {
          await fetchAdmin();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadAdminData(localStorage.getItem("token"));
            }
        }
    loadData();
    },[])

  return <>
    <div className='flex-col'>
      {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><div className='form-data'>
        {data && data.map((item, index) => {
          if (item.email === email) {
          return (
            <div key={index}>
              <div className='form'>
                <h2 className='heading'>Restaurant Update</h2>
                <label id='name' className='labels'>Name: </label>
                <input id='name' name='name'
                  defaultValue={item.name} 
                  onChange={onChangeHandler} value={change.name}
                  type="text" placeholder={item.name} className='feilds' />
                <br />
                <label id='name' className='labels'>Email Id: </label>
                <input name='email' className='feilds' type="text" placeholder={item.email} defaultValue={item.email} disabled />
                <br />
                <label id='name' className='labels'>Restaurant Name: </label>
                <input className='feilds' name='restaurantName'
                  defaultValue={item.restaurantName} 
                  onChange={onChangeHandler} value={change.restaurantName}
                  type="text" placeholder={item.restaurantName} disabled />
                <br />
                <label id='name' className='labels'>City: </label>
                <input className='feilds' name='city'
                defaultValue={item.city} 
                  onChange={onChangeHandler} value={change.city}
                  type="text" placeholder={item.city} />
                <br />
                <label id='name' className='labels'>Country: </label>
                <input className='feilds' name='country'
                  defaultValue={item.country}
                  onChange={onChangeHandler} value={change.country}
                  type="text" placeholder={item.country} />
                <br />
                <label id='name' className='labels'>Delivery Price / Charges :: </label>
                <input className='feilds' id="quantity" defaultValue={item.deliveryPrice} 
                   onChange={onChangeHandler} value={change.deliveryPrice}
                  name='deliveryPrice' type="Number" placeholder={item.deliveryPrice} min="10" />
                <br/>
                <label id='name' className='labels'>Estimated Delivery Time :: </label>
                <input className='feilds' id="estimatedDeliveryTime"
                  defaultValue={item.estimatedDeliveryTime}
                  onChange={onChangeHandler} value={change.estimatedDeliveryTime}
                  name='estimatedDeliveryTime' type="Number" placeholder={item.estimatedDeliveryTime} min="30" />
                <br />
                <button className='but' onClick={updateData}>Update</button>
              </div>
            </div>
          )
          }
        })}

      </div></>}
      
    </div>
  </>
}

export default Home