import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Registration successful! Information sent directly to our server.' });
        setFormData({ fullName: '', email: '', phone: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please check if the server is running.' 
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Could not connect to the server. Please ensure the backend is running on port 5000.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="form-card">
        <div className="form-header">
          <h1>Registration</h1>
          <p>Join us today. Enter your details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="reg-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Register Now'}
          </button>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
        
        <div className="form-footer">
          <p>We'll send your details to <span>novahamotech@gmail.com</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
