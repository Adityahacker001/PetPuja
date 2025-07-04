import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
      <div className='sidebar'>
          <div className='sidebar-options'>
              <NavLink to='/' className='sidebar-option'>
                  <img src={assets.home_icon} className='home_icon' alt='' />
                  <p>Home</p>
              </NavLink>
              <NavLink to='/add' className='sidebar-option'>
                  <img src={assets.add_icon} alt='' />
                  <p>Add Items</p>
              </NavLink>
              <NavLink to='/list' className='sidebar-option'>
                  <img src={assets.list_icon} className='home_icon' alt='' />
                  <p>List Items</p>
              </NavLink>
              <NavLink to='/orders' className='sidebar-option'>
                  <img src={assets.order_icon} className='home_icon' alt='' />
                  <p>Oders</p>
              </NavLink>
              <NavLink to='/update' className='sidebar-option'>
                  <img src={assets.update_icon} className='home_icon' alt='' />
                  <p>Update Details</p>
              </NavLink>
          </div>
      </div>
  )
}

export default Sidebar