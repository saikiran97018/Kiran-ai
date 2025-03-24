import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import TabPanel from './components/TabPanel';
import { AcademicCapIcon, CodeBracketIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import './App.css';

export default function App() {
  const [branch, setBranch] = useState('CSE');
  const [semester, setSemester] = useState('1st');
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Study Plan', icon: AcademicCapIcon, type: 'Study Plan' },
    { name: 'Code Help', icon: CodeBracketIcon, type: 'Code Help' },
    { name: 'Project Idea', icon: LightBulbIcon, type: 'Project Idea' },
    { name: 'Career Prep', icon: RocketLaunchIcon, type: 'Career Prep' }
  ];

  return (
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />
      
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <span>🚀</span>
            </div>
            <div>
              <h1 className="title">KIRAN AI Learning Assistant</h1>
              <p className="subtitle">Your dynamic companion for study, projects, coding, and career success!</p>
            </div>
          </div>
        </header>

        <div className="grid">
          <Sidebar
            branch={branch}
            setBranch={setBranch}
            semester={semester}
            setSemester={setSemester}
          />

          <div>
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <tab.icon className="icon" />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="tab-panel">
              <TabPanel
                type={tabs[activeTab].type}
                branch={branch}
                semester={semester}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}