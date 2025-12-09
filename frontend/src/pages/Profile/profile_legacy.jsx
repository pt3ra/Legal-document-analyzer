import React, { useState, useRef } from 'react';
import './profile.css';

const profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const fileInputRef = useRef(null); 


  const [userData, setUserData] = useState({
    name: 'John Smith',
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: 'john.smith@example.com',
    company: 'LegalTech Solutions',
    position: 'Legal Counsel',
    joinDate: 'January 15, 2023',
    plan: 'Professional',
    documentsAnalyzed: 47,
    avgAnalysisTime: '14s',
    issuesFound: 156,
    monthlyUsage: '24/50'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoDeleteFiles: false,
    language: 'english',
    theme: 'light',
    dataRetention: '90 days'
  });

  const [editForm, setEditForm] = useState({
    name: userData.name,
    email: userData.email,
    company: userData.company,
    position: userData.position
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(prev => ({
        ...prev,
        ...editForm
      }));
    } else {
      // Start editing - populate form with current data
      setEditForm({
        name: userData.name,
        email: userData.email,
        company: userData.company,
        position: userData.position
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageEditToggle = () => {
    setIsEditingImage(!isEditingImage);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
        setIsEditingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setUserData(prev => ({
      ...prev,
      profileImage: null
    }));
    setIsEditingImage(false);
  };

  const recentDocuments = [
    {
      id: 1,
      name: 'employment_agreement.pdf',
      type: 'pdf',
      date: 'Jun 12, 2023',
      status: 'completed',
      size: '2.4 MB',
      riskScore: 77
    },
    {
      id: 2,
      name: 'service_contract.docx',
      type: 'word',
      date: 'Jun 10, 2023',
      status: 'completed',
      size: '1.8 MB',
      riskScore: 44
    },
    {
      id: 3,
      name: 'partnership_agreement.pdf',
      type: 'pdf',
      date: 'Jun 5, 2023',
      status: 'completed',
      size: '3.2 MB',
      riskScore: 98
    },
    {
      id: 4,
      name: 'nda_template.docx',
      type: 'word',
      date: 'May 28, 2023',
      status: 'completed',
      size: '1.1 MB',
      riskScore: 20
    },
    {
      id: 5,
      name: 'lease_agreement.pdf',
      type: 'pdf',
      date: 'May 20, 2023',
      status: 'completed',
      size: '2.7 MB',
      riskScore: 51
    }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTriggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: userData.name,
      email: userData.email,
      company: userData.company,
      position: userData.position
    });
  };

  const getFileIcon = (type) => {
    return type === 'pdf' ? '📄' : '📝';
  };

  const getRiskColor = (score) => {
    if (score >= 70) return '#dc2626';
    if (score >= 40) return '#d97706';
    return '#059669';
  };

  return (
    <div className="user-profile">
      

      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="user-card">
            <div className="avatar">
              <img src={userData.profileImage} alt="Profile" className='profile-full-image' />
              {/*<span class="material-symbols-rounded">person_off</span>*/}
            </div>
            <div className="user-info">
              <h2>{userData.name}</h2>
              <p>{userData.position}</p>
              <p>{userData.company}</p>
              <div className="plan-badge">{userData.plan} Plan</div>
            </div>
          </div>

          {/* Menu Selection*/}
          <div className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span class="material-symbols-rounded">person</span>
              Profile Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <span class="material-symbols-rounded">history</span>
              Document History
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span class="material-symbols-rounded">settings</span>
              Settings
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Profile Overview Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Profile Overview</h2>
                <button className="edit-btn">
                  <span class="material-symbols-rounded">edit_note</span>
                  Edit Profile
                </button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <span class="material-symbols-rounded">contract</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{userData.documentsAnalyzed}</div>
                    <div className="stat-label">Documents Analyzed</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <span class="material-symbols-rounded">nest_clock_farsight_analog</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{userData.avgAnalysisTime}</div>
                    <div className="stat-label">Average Analysis Time</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <span class="material-symbols-rounded">warning</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{userData.issuesFound}</div>
                    <div className="stat-label">Total Issues Found</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <span class="material-symbols-rounded">bar_chart</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{userData.monthlyUsage}</div>
                    <div className="stat-label">Monthly Usage</div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{userData.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>{userData.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Company</label>
                    <p>{userData.company}</p>
                  </div>
                  <div className="info-item">
                    <label>Position</label>
                    <p>{userData.position}</p>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>{userData.joinDate}</p>
                  </div>
                  <div className="info-item">
                    <label>Subscription Plan</label>
                    <p className="plan-text">{userData.plan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Document History Tab */}
          {activeTab === 'history' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Document History</h2>
                <div className="history-actions">
                  <div className="search-box">
                    <span class="material-symbols-rounded">search_gear</span>
                    <input type="text" placeholder="Search documents..." />
                  </div>
                  <select className="filter-select">
                    <option>All Documents</option>
                    <option>This Month</option>
                    <option>Last 3 Months</option>
                    <option>High Risk</option>
                    <option>Low Risk</option>
                  </select>
                </div>
              </div>

              <div className="documents-list">
                {recentDocuments.map(doc => (
                  <div key={doc.id} className="document-card">
                    <div className="doc-icon">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="doc-info">
                      <h4>{doc.name}</h4>
                      <div className="doc-meta">
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span className="status-completed">Analysis Complete</span>
                      </div>
                    </div>
                    <div className="doc-risk">
                      <div 
                        className="risk-score"
                        style={{ backgroundColor: getRiskColor(doc.riskScore) }}
                      >
                        {doc.riskScore}/100
                      </div>
                    </div>
                    <div className="doc-actions">
                      <button className="action-btn">
                        <span class="material-symbols-rounded">bar_chart</span>
                        View Report
                      </button>
                      <button className="action-btn">
                        <span class="material-symbols-rounded">download</span>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button className="page-btn disabled">
                  <span class="material-symbols-rounded">chevron_left</span>
                  Previous
                </button>
                <span className="page-info">Page 1 of 3</span>
                <button className="page-btn">
                  Next
                  <span class="material-symbols-rounded">chevron_right</span>
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>Account Settings</h2>
                <button className="save-btn">
                  <span class="material-symbols-rounded">save</span>
                  Save Changes
                </button>
              </div>

              <div className="settings-sections">
                <div className="settings-section">
                  <h3>Notification Preferences</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Email Notifications</label>
                      <p>Receive email updates about your document analyses</p>
                    </div>
                    <div 
                      className={`toggle ${settings.emailNotifications ? 'active' : ''}`}
                      onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Analysis Completion Alerts</label>
                      <p>Get notified when document analysis is complete</p>
                    </div>
                    <div className="toggle active">
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Privacy & Data</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Auto-delete Files</label>
                      <p>Automatically delete analyzed documents after 90 days</p>
                    </div>
                    <div 
                      className={`toggle ${settings.autoDeleteFiles ? 'active' : ''}`}
                      onClick={() => handleSettingChange('autoDeleteFiles', !settings.autoDeleteFiles)}
                    >
                      <div className="toggle-slider"></div>
                    </div>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Data Retention Period</label>
                      <p>How long to keep your analyzed documents</p>
                    </div>
                    <select 
                      className="setting-select"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                    >
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Preferences</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Language</label>
                      <p>Interface language preference</p>
                    </div>
                    <select 
                      className="setting-select"
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <label>Theme</label>
                      <p>Choose your preferred interface theme</p>
                    </div>
                    <select 
                      className="setting-select"
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="danger-actions">
                    <button className="danger-btn export-btn">
                      <span class="material-symbols-rounded">file_export</span>
                      Export All Data
                    </button>
                    <button className="danger-btn delete-btn">
                      <span class="material-symbols-rounded">delete</span>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default profile;