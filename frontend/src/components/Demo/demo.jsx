import React, { useRef } from 'react'
import './demo.css'
import upload from '../../assets/upload.png'
import sample from '../../assets/sample.png'
import handshake from '../../assets/handshake.png'
import white_arrow from '../../assets/white-arrow.png'
import { NavLink as Link } from 'react-router-dom';

const demo = () => {

  return (
    <div className='demo'>
        <img src={upload} alt="" className='upload'/>
        <h3>Upload Your Legal Document</h3>
        <p>Drag & drop your file here or click to browse</p>
        <p className='suported-formats'>Supported formats: PDF, DOCX, TXT (Max 20MB)</p>
                
        <div className='sample-docs'>
            <Link to='/dashboard'><div className='sample-doc'>
                <img src={sample} alt="" className='sample'/>
                Sample Employment Contract
            </div></Link>
            <Link to='/dashboard'><div className='sample-doc'>
                <img src={handshake} alt="" className='handshake'/>
                Sample NDA
            </div></Link>
        </div>

        <Link to='/dashboard'><button className='btn dark-btn'>Analyze Document<img src={white_arrow} alt="" /></button></Link>
    </div>
  )
}

export default demo