import React, { useContext, useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
const Add = () => {
    const url = "http://localhost:4000";
    const { getTotalCartAmount, food_list } = useContext(StoreContext)
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category:"Salad"
    })









  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [adminData, setAdminData] = useState([]);
    const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/admin/listadmin");
    setAdminData(response.data.data)
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









    const onChangaeHAndler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        adminData.map((item, index) => {
            if (item.email === email) {
                formData.append("userId",email)
            }
        })
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData,{ headers: { token } })
        if (response.data.success) {
            setData({
                userId:"",
                name: "",
                description: "",
                price: "",
                category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
}

  return (
      <div className='add'>
          {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><form className='flex-col' onSubmit={onSubmitHandler}>
              <div className='add-img-upload flex-col'>
                  <p>Upload Image</p>
                  <label htmlFor='image'>
                      <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
                  </label>
                  <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
              </div>
              <div className='add-product-name flex-col'>
                  <p>Product name</p>
                  <input onChange={onChangaeHAndler} value={data.name} type='text' name='name' placeholder='Type here'/>
              </div>
              <div className='add-product-description flex-col'>
                  <p>Product description</p>
                  <textarea onChange={onChangaeHAndler} value={data.description} name='description' rows="6" placeholder='Write Content here'></textarea>
              </div>
              <div className='add-category-price'>
                  <div className='add-category flex-col'>
                      <p>Product category</p>
                      <select onChange={onChangaeHAndler} name='category'>
                          <option value="Salad">Salad</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Desert">Desert</option>
                          <option value="Sandwich">Sandwich</option>
                          <option value="Cake">Cake</option>
                          <option value="Pure Veg">Pure Veg</option>
                          <option value="Pasta">Pasta</option>
                          <option value="Noodles">Noodles</option>
                          <option value="chinese ">chinese </option>
                      </select>
                  </div>
                  <div className='add-price flex-col'>
                      <p>Product Price</p>
                      <input onChange={onChangaeHAndler} value={data.price} type='Number' name='price' placeholder=' ₹ 100'/>
                  </div>
              </div>
              <button type='submit' className='add-btn'>ADD</button>
          </form></>}
          
    </div>
  )
}

export default Add