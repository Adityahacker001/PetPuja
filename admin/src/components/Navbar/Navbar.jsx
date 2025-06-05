import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({ setAdminLogin }) => {
  const { token, setToken ,isVisible,setIsVisible} = useContext(StoreContext);
  // const [token, setToken] = useState("")
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
    }
  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt='' /></Link> 
      {!token ? <button onClick={() => { setIsVisible(true), setAdminLogin(true) }}>sign in</button> :
        <div className='navbar-profile'>
          <img src={assets.profile_image} alt='' />
          <ul className='nav-profile-dropdown'>
            <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
          </ul>
        </div>
      }
      </div>
  )
}

export default Navbar