import React from 'react'
import './footer.css'
import logo from '../../assets/logo.png'
import facebook from '../../assets/icon-facebook.png'
import youtube from '../../assets/icon-youtube.png'
import twitter from '../../assets/icon-twitter.png'
import linkedin from '../../assets/icon-linkedin.png'
import { Link as ScrollLink} from 'react-scroll';
import { NavLink as Link, useLocation, useNavigate } from 'react-router-dom';

const footer = () => {
  return (
    <div className='footer'>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <ScrollLink to='/'>How it works</ScrollLink>
            <ScrollLink to='/'>Testimonials</ScrollLink>
            <ScrollLink to='/'>Testimonials2</ScrollLink>
            <ScrollLink to='/'>Testimonials3</ScrollLink>
            <ScrollLink to='/'>Testimonials4</ScrollLink>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <ScrollLink to='/'>How it works</ScrollLink>
            <ScrollLink to='/'>Testimonials</ScrollLink>
            <ScrollLink to='/'>Testimonials2</ScrollLink>
            <ScrollLink to='/'>Testimonials3</ScrollLink>
            <ScrollLink to='/'>Testimonials4</ScrollLink>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <ScrollLink to='/'>How it works</ScrollLink>
            <ScrollLink to='/'>Testimonials</ScrollLink>
            <ScrollLink to='/'>Testimonials2</ScrollLink>
            <ScrollLink to='/'>Testimonials3</ScrollLink>
            <ScrollLink to='/'>Testimonials4</ScrollLink>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <ScrollLink to='/'>How it works</ScrollLink>
            <ScrollLink to='/'>Testimonials</ScrollLink>
            <ScrollLink to='/'>Testimonials2</ScrollLink>
            <ScrollLink to='/'>Testimonials3</ScrollLink>
            <ScrollLink to='/'>Testimonials4</ScrollLink>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
            <Link to='/'><img src={logo} alt="" className='logo'/></Link>
          <small className="website-rights">LexiScan 2025</small>
          <div className="social-icons">
            <Link className="social-icon-link facebook" to="/" target="_blank" aria-label="Facebook"><img src={facebook} alt="" className='facebook'/></Link>
            <Link className="social-icon-link youtube" to="/" target="_blank" aria-label="Youtube"><img src={youtube} alt="" className='youtube'/></Link>
            <Link className="social-icon-link twitter" to="/" target="_blank" aria-label="Twitter"><img src={twitter} alt="" className='twitter'/></Link>
            <Link className="social-icon-link linkedin" to="/" target="_blank" aria-label="Linkedin"><img src={linkedin} alt="" className='linkedin'/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default footer