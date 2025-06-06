import React from 'react'
import './Profile.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

const Profile = () => {



  const [data, setData] = useState([])
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")

    const url = "https://petpuja-backend-ww2v.onrender.com"
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
        <div className='profiles'>
            {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><h2 className='profilehead'>Restaurant Profile</h2>
            {data.map((item, index) => {
                if (item.email === email) {
                    return <>
                        <p className='profile'>Owner : <span className='datas'>{item.name}</span></p>
                        <p className='profile'>Restaurant Name : <span className='datas'>{item.restaurantName}</span></p>
                        <p className='profile'>City : <span className='datas'>{item.city}</span></p>
                        <p className='profile'>Country : <span className='datas'>{item.country}</span></p>
                        <p className='profile'>Delivery Price : <span className='datas'>{item.deliveryPrice}.00 ₹</span></p>
                        <p className='profile'>Estimated Delivery Time : <span className='datas'>{item.estimatedDeliveryTime}min</span></p>

                        
                    </>
                }
            })}</>}
      </div>
  </>
}

export default Profile