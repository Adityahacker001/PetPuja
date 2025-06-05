import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { assets } from '../../assets/assets'
import axios from 'axios'
import './Menu.css'
import { StoreContext } from '../../context/StoreContext'
const Menu = () => {


    const [email, setEmail] = useState("")
  const [adminData, setAdminData] = useState([]);
    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext); 
  const [list, setList] = useState([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
    }
    const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/admin/listadmin");
        setAdminData(response.data.data)
  }
  useEffect(() => {
      fetchList();
      fetchAdmin(); 
      onClick();
      
  }, [])
    const onClick = () => {
        var x = document.getElementById("search");
        x.addEventListener("focus", function () {
            document.getElementById("serche_element").style.display = "block"
            document.getElementById("hi").style.display = "block"
        })
        x.addEventListener("blur", function () {
            document.getElementById("serche_element").style.display = "none"
            document.getElementById("hi").style.display = "none";
        }) 
        x.addEventListener("input", function () {
            const filterarray=list.filter(obj=>obj.name.toLowerCase().startsWith(x.value))
            var clutter = "";
            filterarray.forEach(function (obj) {
                console.log(obj.name)
                clutter+=`<p>${obj.name}</p>`
            }) 
            document.getElementById("hi").style.display = "block"
            document.getElementById("hi").innerHTML = clutter;
        })
    }
  return (
      <div> 
          <div className='searchbar'>
              <input id='search' className='search' placeholder='Search Food Items' type="text" />
              <div id='serche_element'>
                  <div id='hi'> 
                  </div>
              </div>
          </div>
          {/* <div className='overlay'><p id='hi'>hi</p></div> */}
          <div className='list'>
            <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
                  <b>Price</b>
                  <b>Restaurants </b>
            </div>
              {
                  list.map((item, index) => {
                      return (
                          <div key={index} className='list-table-format'>
                          <img src={`${url}/images/`+item.image} alt='' />
                           <p className='name'>{item.name }</p>
                          <p className='name'>{item.category }</p>
                        <p className='name'>₹{item.price}</p>
                              {adminData.map((data, index) => {
                                  if (data.email === item.userId) {
                                      return(<p className='name restname'>{data.restaurantName}</p>)
                                  }
                              })}
                            {!cartItems[item._id]
                            ?<img className='add' onClick={()=>addToCart(item._id)} src={assets.add_icon_white} alt="" />
                            :<div className='plusminus'>
                            <img onClick={()=>removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                             <p>{cartItems[item._id]}</p>
                             <img onClick={()=>addToCart(item._id)} src={assets.add_icon_green} alt="" />
                             </div>
                             }
                          </div>
                      )
                  })
              }
              
          </div>
    </div>
  )
}

export default Menu