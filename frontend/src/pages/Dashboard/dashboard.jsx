import React, { useState } from 'react';
import FileUploader from '../../components/Dashboard/fileUploader';
import DocumentOverview from '../../components/Dashboard/documentOverview';
import DocumentSummary from '../../components/Dashboard/documentSummary';
import RiskAnalysis from '../../components/Dashboard/riskAnalysis';
import './dashboard.css';

const dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Data for mock analysis
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
      score: 44,
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
          <span class="material-symbols-rounded">upload</span>
          Upload & Analyze
        </button>
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('overview')}
        >
          <span class="material-symbols-rounded">pie_chart</span>
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'summary' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('summary')}
        >
          <span class="material-symbols-rounded">clarify</span>
          Summary & Clauses
        </button>
        <button 
          className={`tab ${activeTab === 'risks' ? 'active' : ''} ${!analysisResult ? 'disabled' : ''}`}
          onClick={() => analysisResult && setActiveTab('risks')}
        >
          <span class="material-symbols-rounded">warning</span>
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
                      <span class="material-symbols-rounded">file_present</span>
                      <div>
                        <h4>{analysisResult.document.name}</h4>
                        <p>Analyzed on {analysisResult.document.uploadDate}</p>
                      </div>
                    </div>
                    <div 
                      className="grade-badge"
                      style={{ 
                        backgroundColor: analysisResult.overview.score <= 30 ? '#059669' : 
                                       analysisResult.overview.score <= 60 ? '#d97706' : '#dc2626' 
                      }}
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

export default dashboard;