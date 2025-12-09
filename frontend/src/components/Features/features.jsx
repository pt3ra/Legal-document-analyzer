import React from 'react'
import './features.css'
import feature_1 from '../../assets/feature-1.png'
import feature_2 from '../../assets/feature-2.png'
import feature_3 from '../../assets/feature-3.png'
import feature_icon_1 from '../../assets/feature-icon-1.png'
import feature_icon_2 from '../../assets/feature-icon-2.png'
import feature_icon_3 from '../../assets/feature-icon-3.png'

const features = () => {
  return (
    <div className='features'>
        <div className='feature'>
            <img src={feature_1} alt="" />
            <div className="caption">
                <img src={feature_icon_1} alt="" />
                <h3>Risk Detection</h3>
                <p>Automatically identify potentially problematic clauses, ambiguous language, and non-standard terms.</p>
            </div>
        </div>
        <div className='feature'>
            <img src={feature_2} alt="" />
            <div className="caption">
                <img src={feature_icon_2} alt="" />
                <h3>Instant Analysis</h3>
                <p>Get comprehensive document analysis in seconds, not hours. Upload and receive results immediately.</p>
            </div>
        </div>
        <div className='feature'>
            <img src={feature_3} alt="" />
            <div className="caption">
                <img src={feature_icon_3} alt="" />
                <h3>Detailed Reports</h3>
                <p>Receive clear, plain-English summaries with highlighted issues and practical recommendations.</p>
            </div>
        </div>
    </div>
  )
}

export default features