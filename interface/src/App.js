import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const FormFillingAgent = () => {
  const [formLink, setFormLink] = useState('');
  const [requirements, setRequirements] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async () => {
    setStatus('processing');

    try {
      const response = await fetch('http://127.0.0.1:8000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_info: requirements,
          form_url: formLink,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setStatus('success');
      setFormLink('');
      setRequirements('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Form Filling Agent</h3>
        </div>
        <div className="card-content">
          <div className="form-content">
            <input
              type="text"
              placeholder="Enter form link"
              value={formLink}
              onChange={(e) => setFormLink(e.target.value)}
            />
            <textarea
              placeholder="Enter requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={status === 'processing'}
              className={status === 'processing' ? 'processing' : ''}
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="spinner" />
                  Processing...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="alert success-alert">
              <h5>Success!</h5>
              <div>Your form has been processed successfully.</div>
            </div>
          )}

          {status === 'error' && (
            <div className="alert error-alert">
              <h5>Error</h5>
              <div>An error occurred. Please try again.</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .form-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 48px 16px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .card {
          max-width: 640px;
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          padding: 24px;
          border-bottom: 1px solid #e9ecef;
        }

        .card-title {
          text-align: center;
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .card-content {
          padding: 24px;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-content input,
        .form-content textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-content textarea {
          min-height: 128px;
          resize: vertical;
        }

        .form-content input:focus,
        .form-content textarea:focus {
          outline: none;
          border-color: #4c6ef5;
          box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.1);
        }

        .form-content button {
          background-color: #4c6ef5;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
        }

        .form-content button:hover:not(:disabled) {
          background-color: #4263eb;
        }

        .form-content button:disabled {
          background-color: #dee2e6;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
          width: 16px;
          height: 16px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .alert {
          border-radius: 6px;
          padding: 16px;
          margin-top: 24px;
        }

        .alert h5 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .success-alert {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
        }

        .success-alert h5 {
          color: #155724;
        }

        .success-alert div {
          color: #1e7e34;
          font-size: 16px;
        }

        .error-alert {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }

        .error-alert h5 {
          color: #721c24;
        }

        .error-alert div {
          color: #921925;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default FormFillingAgent;