import React from 'react'
import './hero.css'
import { NavLink as Link } from 'react-router-dom';
import dark_arrow from '../../assets/dark-arrow.png'

const hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Analyze Legal Documents with Confidence</h1>
            <p>AI-powered contract review that helps you identify risks, understand complex clauses, and make informed decisions in minutes</p>
            <Link to='/dashboard'><button className='btn'>Get Started Free<img src={dark_arrow} alt="" /></button></Link>
        </div>
        
    </div>
  )
}

export default hero
