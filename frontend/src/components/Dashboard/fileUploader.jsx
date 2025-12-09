import React, { useState } from 'react';
import upload from '../../assets/upload.png'
import sample from '../../assets/sample.png'
import handshake from '../../assets/handshake.png'
import home from '../../assets/home-icon.png'

const fileUploader = ({ onFileUpload, isAnalyzing, hasAnalysis }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef(null);

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
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSampleDocument = (type) => {
    const mockFile = {
      name: `${type}_sample.pdf`,
      type: 'application/pdf',
      size: 2048576
    };
    onFileUpload(mockFile);
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
            <p>This may take a while</p>
          </div>
        ) : (
          <>
            <img src={upload} alt="" className='upload'/>
            <h3>Upload Legal Document</h3>
            <p>Drag & drop your file here or click to browse</p>
            <p className="file-types">Supported formats: PDF, DOCX, TXT (Max 20MB)</p>
            
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              onChange={handleChange}
              accept=".pdf,.docx,.txt"
              style={{ display: 'none' }}
            />
            <button 
              className="browse-btn"
              onClick={handleBrowseClick}
              type="button"
            >
              Browse Files
            </button>

            <div className="sample-documents">
              <p>Try with sample documents:</p>
              <div className="sample-buttons">
                <button 
                  className="sample-btn"
                  onClick={() => handleSampleDocument('employment')}
                  type="button"
                >
                  <img src={sample} alt="" className='sample'/>
                  Employment Agreement
                </button>
                <button 
                  className="sample-btn"
                  onClick={() => handleSampleDocument('nda')}
                  type="button"
                >
                  <img src={handshake} alt="" className='handshake'/>
                  NDA Template
                </button>
                <button 
                  className="sample-btn"
                  onClick={() => handleSampleDocument('lease')}
                  type="button"
                >
                  <img src={home} alt="" className='home'/>
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

export default fileUploader;