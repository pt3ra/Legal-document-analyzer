import React from 'react';

const documentSummary = ({ data }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#059669';
      default: return '#64748b';
    }
  };

  return (
    <div className="summary-section">
      <div className="summary-header">
        <h2>Document Summary</h2>
        <p>Comprehensive breakdown of your legal document</p>
      </div>

      <div className="summary-content">
        <div className="executive-summary">
          <h3>Executive Summary</h3>
          <div className="summary-text">
            <p>{data.executive}</p>
          </div>
        </div>

        <div className="key-clauses">
          <h3>Key Clauses Identified</h3>
          <div className="clauses-list">
            {data.keyClauses.map((clause, index) => (
              <div key={index} className="clause-card">
                <div className="clause-header">
                  <h4>{clause.name}</h4>
                  <span 
                    className="risk-badge"
                    style={{ backgroundColor: getRiskColor(clause.risk) }}
                  >
                    {clause.risk.toUpperCase()} RISK
                  </span>
                </div>
                <div className="clause-section">
                  <strong>Section:</strong> {clause.section}
                </div>
                <p className="clause-description">{clause.description}</p>
                <button className="clause-action">
                  <span class="material-symbols-rounded">article_shortcut</span>
                  View in Document
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default documentSummary;