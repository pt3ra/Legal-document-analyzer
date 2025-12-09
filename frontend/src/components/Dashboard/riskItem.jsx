import React from 'react';

const riskItem = ({ risk, level }) => {
  return (
    <div className={`risk-item ${level}`}>
      <div className="risk-header">
        <h4>{risk.title}</h4>
        <div className="risk-meta">
          {risk.confidence && (
            <span className="confidence">Confidence: {risk.confidence}%</span>
          )}
          <span className="section">Section {risk.section}</span>
        </div>
      </div>
      <p className="risk-description">{risk.description}</p>
      {risk.recommendation && (
        <div className="recommendation">
          <strong>Recommendation:</strong> {risk.recommendation}
        </div>
      )}
      <div className="risk-actions">
        <button className="risk-action-btn">
          <span class="material-symbols-rounded">visibility</span>
          View in Document
        </button>
        <button className="risk-action-btn">
          <span class="material-symbols-rounded">comment</span>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default riskItem;