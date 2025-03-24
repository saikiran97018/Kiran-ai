import { useState } from 'react';
import { generateResponse } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import '../styles/TabPanel.css';

export default function TabPanel({ type, branch, semester }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Please enter your query first!');
      return;
    }

    setLoading(true);
    try {
      const result = await generateResponse(type, branch, semester, input);
      setResponse(result);
      toast.success('Response generated successfully!');
    } catch (error) {
      toast.error('Failed to generate response. Please try again.');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'Study Plan':
        return 'E.g., "I struggle with data structures"';
      case 'Code Help':
        return 'E.g., "def sort(arr): arr.sort["';
      case 'Project Idea':
        return 'E.g., "Suggest a project for IoT in mechanical engineering"';
      case 'Career Prep':
        return 'E.g., "Prepare me for a software engineering interview"';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit} className="form">
        {type === 'Code Help' ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            className="textarea"
            required
          />
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            className="input"
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary ${loading ? 'disabled' : ''}`}
        >
          {loading && (
            <ArrowPathIcon className="loading-spinner" style={{ width: '1.25rem', height: '1.25rem' }} />
          )}
          {loading ? 'Generating...' : `Generate ${type}`}
        </button>
      </form>

      {response && (
        <div className="response-container">
          <h3 className="response-title">Response:</h3>
          <div className="response-content">{response}</div>
        </div>
      )}
    </div>
  );
}