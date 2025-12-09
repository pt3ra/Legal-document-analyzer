import React from 'react';

const documentOverview = ({ data }) => {
  const getScoreColor = (score) => {
    if (score <= 30) return '#059669';
    if (score <= 60) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="overview-section">
      <div className="overview-header">
        <div className="document-meta">
          <span class="material-symbols-rounded">file_present</span>
          <div>
            <h2>{data.document.name}</h2>
            <p>{data.document.size} • {data.document.pages} pages • Analyzed on {data.document.uploadDate}</p>
          </div>
        </div>
        <div className="overview-score">
          <div 
            className="score-circle"
            style={{ borderColor: getScoreColor(data.overview.score) }}
          >
            <span style={{ color: getScoreColor(data.overview.score) }}>
              {data.overview.score}
            </span>
            <small>/100</small>
          </div>
          <div className="score-info">
            <div className="grade">{data.overview.grade}</div>
            <div className="risk-level">{data.overview.riskLevel} Risk</div>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="summary-card">
          <h3>Executive Summary</h3>
          <p>{data.overview.summary}</p>
        </div>

        <div className="stats-card">
          <h3>Key Metrics</h3>
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-value">1</div>
              <div className="metric-label">Critical Issue</div>
            </div>
            <div className="metric">
              <div className="metric-value">2</div>
              <div className="metric-label">Warnings</div>
            </div>
            <div className="metric">
              <div className="metric-value">12</div>
              <div className="metric-label">Total Clauses</div>
            </div>
            <div className="metric">
              <div className="metric-value">4</div>
              <div className="metric-label">Key Findings</div>
            </div>
          </div>
        </div>

        <div className="actions-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span class="material-symbols-rounded">download</span>
              Download Report
            </button>
            <button className="action-btn">
              <span class="material-symbols-rounded">share</span>
              Share Analysis
            </button>
            <button className="action-btn">
              <span class="material-symbols-rounded">print</span>
              Print Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default documentOverview;