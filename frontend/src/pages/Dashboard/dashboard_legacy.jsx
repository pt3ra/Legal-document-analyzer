// Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

const dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis data
  const mockAnalysis = {
    document: {
      name: 'employment_agreement.pdf',
      type: 'pdf',
      size: '2.4 MB',
      pages: 12,
      uploadDate: new Date().toLocaleDateString()
    },
    overview: {
      grade: 'B-',
      score: 72,
      summary: 'This employment agreement contains standard clauses with several areas that require attention. The non-compete clause is particularly broad and may be unenforceable in some jurisdictions.',
      riskLevel: 'medium'
    },
    summary: {
      executive: 'This is a standard employment agreement between Company XYZ and the employee. The contract outlines terms of employment, compensation, benefits, and termination conditions. Key areas of concern include the non-compete clause and intellectual property provisions.',
      keyClauses: [
        {
          name: 'Non-Compete Agreement',
          section: '8.2',
          description: 'Restricts employee from working in similar industry for 24 months within 100-mile radius.',
          risk: 'high'
        },
        {
          name: 'Intellectual Property',
          section: '6.1',
          description: 'All IP created during employment belongs to company, including personal projects.',
          risk: 'medium'
        },
        {
          name: 'Termination Conditions',
          section: '9.3',
          description: 'Company can terminate without cause with 2 weeks notice.',
          risk: 'low'
        },
        {
          name: 'Confidentiality',
          section: '7.1',
          description: 'Standard confidentiality agreement protecting company information.',
          risk: 'low'
        }
      ]
    },
    risks: {
      critical: [
        {
          title: 'Overly Broad Non-Compete',
          section: '8.2',
          confidence: 94,
          description: 'The non-compete restriction extends for 24 months and covers a 100-mile radius, which may be deemed unreasonable in many jurisdictions.',
          recommendation: 'Consider reducing to 6-12 months and limiting geographical scope.'
        }
      ],
      warnings: [
        {
          title: 'Unlimited IP Assignment',
          section: '6.1',
          confidence: 87,
          description: 'The intellectual property clause claims ownership of all creations during employment, including personal projects.',
          recommendation: 'Add exceptions for personal projects developed outside work hours without company resources.'
        },
        {
          title: 'Vague Termination Clause',
          section: '9.3',
          confidence: 76,
          description: 'Termination conditions lack specific performance metrics and appeal process.',
          recommendation: 'Define clear performance indicators and establish an appeal process.'
        }
      ],
      recommendations: [
        {
          title: 'Add Severability Clause',
          section: 'N/A',
          description: 'Consider adding a severability clause to protect the rest of the agreement if one provision is found invalid.'
        },
        {
          title: 'Clarify Benefit Terms',
          section: '4.2',
          description: 'Health insurance and retirement benefits should have more specific eligibility details.'
        }
      ]
    }
  };

  const handleFileUpload = (file) => {
    setIsAnalyzing(true);
    setUploadedFile(file);
    
    // Simulate API call delay
    setTimeout(() => {
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      setActiveTab('overview');
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#059669';
      default: return '#64748b';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#059669';
    if (score >= 60) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Document Analyzer</h1>
        <p>Upload your legal document for comprehensive AI analysis</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <i className="fas fa-upload"></i>
          Upload & Analyze
        </button>
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('overview')}
        >
          <i className="fas fa-chart-pie"></i>
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'summary' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('summary')}
        >
          <i className="fas fa-file-alt"></i>
          Summary & Clauses
        </button>
        <button 
          className={`tab ${activeTab === 'risks' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('risks')}
        >
          <i className="fas fa-exclamation-triangle"></i>
          Risk Analysis
        </button>
      </div>

      <div className="dashboard-content">
        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="tab-content">
            <FileUploader 
              onFileUpload={handleFileUpload}
              isAnalyzing={isAnalyzing}
              hasAnalysis={!!analysisResult}
            />
            
            {analysisResult && (
              <div className="quick-result">
                <h3>Last Analysis Result</h3>
                <div className="result-card">
                  <div className="result-header">
                    <div className="document-info">
                      <i className="fas fa-file-pdf"></i>
                      <div>
                        <h4>{analysisResult.document.name}</h4>
                        <p>Analyzed on {analysisResult.document.uploadDate}</p>
                      </div>
                    </div>
                    <div 
                      className="grade-badge"
                      style={{ backgroundColor: getScoreColor(analysisResult.overview.score) }}
                    >
                      {analysisResult.overview.grade}
                    </div>
                  </div>
                  <div className="result-summary">
                    <p>{analysisResult.overview.summary}</p>
                  </div>
                  <div className="result-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('overview')}
                    >
                      View Full Report
                    </button>
                    <button className="btn btn-outline">
                      Analyze New Document
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && analysisResult && (
          <div className="tab-content">
            <DocumentOverview data={analysisResult} />
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === 'summary' && analysisResult && (
          <div className="tab-content">
            <DocumentSummary data={analysisResult.summary} />
          </div>
        )}

        {/* Risks Tab */}
        {activeTab === 'risks' && analysisResult && (
          <div className="tab-content">
            <RiskAnalysis data={analysisResult.risks} />
          </div>
        )}
      </div>
    </div>
  );
};

// File Uploader Component
const FileUploader = ({ onFileUpload, isAnalyzing, hasAnalysis }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="upload-section">
      <div 
        className={`upload-area ${dragActive ? 'active' : ''} ${isAnalyzing ? 'analyzing' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isAnalyzing ? (
          <div className="analyzing-state">
            <div className="spinner"></div>
            <h3>Analyzing Document...</h3>
            <p>This may take a few seconds</p>
          </div>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt"></i>
            <h3>Upload Legal Document</h3>
            <p>Drag & drop your file here or click to browse</p>
            <p className="file-types">Supported formats: PDF, DOCX, TXT (Max 20MB)</p>
            
            <input
              type="file"
              id="file-upload"
              onChange={handleChange}
              accept=".pdf,.docx,.txt"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="browse-btn">
              Browse Files
            </label>

            <div className="sample-documents">
              <p>Try with sample documents:</p>
              <div className="sample-buttons">
                <button className="sample-btn">
                  <i className="fas fa-file-contract"></i>
                  Employment Agreement
                </button>
                <button className="sample-btn">
                  <i className="fas fa-handshake"></i>
                  NDA Template
                </button>
                <button className="sample-btn">
                  <i className="fas fa-home"></i>
                  Lease Agreement
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Document Overview Component
const DocumentOverview = ({ data }) => {
  return (
    <div className="overview-section">
      <div className="overview-header">
        <div className="document-meta">
          <i className="fas fa-file-pdf"></i>
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
              <div className="metric-value">3</div>
              <div className="metric-label">Critical Issues</div>
            </div>
            <div className="metric">
              <div className="metric-value">5</div>
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
              <i className="fas fa-download"></i>
              Download Report
            </button>
            <button className="action-btn">
              <i className="fas fa-share"></i>
              Share Analysis
            </button>
            <button className="action-btn">
              <i className="fas fa-print"></i>
              Print Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Document Summary Component
const DocumentSummary = ({ data }) => {
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
                  <i className="fas fa-external-link-alt"></i>
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

// Risk Analysis Component
const RiskAnalysis = ({ data }) => {
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
            <i className="fas fa-exclamation-circle"></i>
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
            <i className="fas fa-exclamation-triangle"></i>
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
            <i className="fas fa-lightbulb"></i>
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

// Risk Item Component
const RiskItem = ({ risk, level }) => {
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
          <i className="fas fa-eye"></i>
          View in Document
        </button>
        <button className="risk-action-btn">
          <i className="fas fa-comment"></i>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default dashboard;