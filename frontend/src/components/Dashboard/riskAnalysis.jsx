import React from 'react';
import RiskItem from './riskItem';

const riskAnalysis = ({ data }) => {
  return (
    <div className="risks-section">
      <div className="risks-header">
        <h2>Risk Analysis</h2>
        <p>Detailed breakdown of potential issues and recommendations</p>
      </div>

      <div className="risks-content">
        {/* Critical Risks */}
        <div className="risk-category critical">
          <div className="category-header">
            <span class="material-symbols-rounded">error</span>
            <h3>Critical Issues</h3>
            <span className="count-badge">{data.critical.length}</span>
          </div>
          <div className="risks-list">
            {data.critical.map((risk, index) => (
              <RiskItem key={index} risk={risk} level="critical" />
            ))}
          </div>
        </div>

        {/* Warnings */}
        <div className="risk-category warning">
          <div className="category-header">
            <span class="material-symbols-rounded">warning</span>
            <h3>Warnings</h3>
            <span className="count-badge">{data.warnings.length}</span>
          </div>
          <div className="risks-list">
            {data.warnings.map((risk, index) => (
              <RiskItem key={index} risk={risk} level="warning" />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="risk-category recommendation">
          <div className="category-header">
            <span class="material-symbols-rounded">lightbulb_2</span>
            <h3>Recommendations</h3>
            <span className="count-badge">{data.recommendations.length}</span>
          </div>
          <div className="risks-list">
            {data.recommendations.map((risk, index) => (
              <RiskItem key={index} risk={risk} level="recommendation" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default riskAnalysis;