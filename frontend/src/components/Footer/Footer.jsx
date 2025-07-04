import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">

                <div className="footer-content-left">
                    <img src={assets.logo2} className='logo' alt="" />
                    <p>dgbhrtyrebbhbu57u5burtyvgy65yv45tc3t45yey</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+915736245670</li>
                        <li>contact@cheiffood.com</li>
                    </ul>
                </div>
                <div className='owner-web'>
                 <p>Adityasingh</p>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © cheiffood.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer