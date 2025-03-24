import { useState } from 'react';
import { branches, semesters, youtubeResources } from '../constants/data';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import '../styles/Sidebar.css';

export default function Sidebar({ branch, setBranch, semester, setSemester }) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span>⚙️</span>
          Settings
        </h2>
        
        <div className="form-groups">
          <div className="form-group">
            <label className="form-label">
              Your Branch 🎓
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="select"
            >
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Your Semester 📅
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="select"
            >
              {semesters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="resources">
        <button
          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
          className="resources-button"
        >
          <span>YouTube Resources</span>
          <ChevronDownIcon
            style={{
              width: '1.25rem',
              height: '1.25rem',
              transform: isResourcesOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s'
            }}
          />
        </button>
        
        {isResourcesOpen && youtubeResources[branch] && (
          <div className="resources-content">
            {youtubeResources[branch].map((resource, index) => (
              <div key={index} className="resource-item">
                <span className="resource-bullet">•</span>
                <span>{resource}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}