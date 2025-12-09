import React from 'react'
import './about.css'

const about = () => {
  return (
    <div className='steps'>
        <div className='step'>
            <div class="step-number">1</div>
            <h3>Upload Document</h3>
            <p>Drag and drop your PDF, DOCX, or TXT file</p>
        </div>
        <div className='step'>
            <div class="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our system scans for risks and key clauses</p>
        </div>
        <div className='step'>
            <div class="step-number">3</div>
            <h3>Review Report</h3>
            <p>Get detailed insights and recommendations</p>
        </div>
    </div>
  )
}

export default about