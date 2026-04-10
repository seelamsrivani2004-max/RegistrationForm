import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.jpg';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course) {
      setStatus({ type: 'error', message: 'Please fill in all fields (including course).' });
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
        setIsSubmitted(true);
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
        {isSubmitted ? (
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p className="greeting-msg">Welcome to NovaHamoTech PVT LMT build your carrer here is the steps to grew up</p>
            
            <div className="steps-container">
              <div className="step-item">
                <span className="step-num">1</span>
                <p>Verify your details in the confirmation email.</p>
              </div>
              <div className="step-item">
                <span className="step-num">2</span>
                <p>Join our orientation session on Monday.</p>
              </div>
              <div className="step-item">
                <span className="step-num">3</span>
                <p>Start your learning journey with our mentors.</p>
              </div>
            </div>
            
            <button onClick={() => setIsSubmitted(false)} className="back-btn">
              Register Another Student
            </button>
          </div>
        ) : (
          <>
            <div className="logo-container">
              <img src={logo} alt="Company Logo" className="company-logo" />
            </div>
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

              <div className="input-group">
                <label htmlFor="course">Select Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose a course...</option>
                  <option value="Data Analysis with AIML">1. Data Analysis with AIML</option>
                  <option value="Python full stack with AIML">2. Python full stack with AIML</option>
                  <option value="Python with Flutter and AIML">3. Python with Flutter and AIML</option>
                </select>
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
