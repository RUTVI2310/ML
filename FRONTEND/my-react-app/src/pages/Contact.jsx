import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) tempErrors.message = 'Message is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      });
      // Clear success alert after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="container">
        {/* HEADER */}
        <div className="page-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have questions about the model integration or prediction engine? Reach out to our simulation lab.
          </p>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="contact-grid">
          {/* LEFT: INFO COLUMN */}
          <div className="contact-info-panel">
            <h2>Let's Connect</h2>
            <p className="contact-panel-desc">
              Have inquiries about deploying FraudShield AI on production databases, extending feature sets, or licensing model parameter grids? Get in touch with our representative team.
            </p>

            <div className="contact-methods">
              <div className="contact-method-card">
                <div className="method-icon-box">
                  <Mail size={20} />
                </div>
                <div className="method-details">
                  <h4>Email</h4>
                  <a href="mailto:support@fraudshield.ai">support@fraudshield.ai</a>
                  <span className="demo-notice">Demo Inbox Only</span>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon-box">
                  <Phone size={20} />
                </div>
                <div className="method-details">
                  <h4>Phone</h4>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                  <span className="demo-notice">Demo Line Only</span>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="method-details">
                  <h4>Location</h4>
                  <p>Gujarat, India</p>
                  <span className="demo-notice">Demo Location Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM COLUMN */}
          <div className="contact-form-panel">
            <h2>Send a Message</h2>
            
            {submitted && (
              <div className="success-banner animate-slide-up">
                <CheckCircle2 className="success-banner-icon" size={20} />
                <div className="success-banner-text">
                  <strong>Success!</strong> Your message has been submitted successfully.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'form-input input-error' : 'form-input'}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'form-input input-error' : 'form-input'}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Integration Query"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'form-input input-error' : 'form-input'}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="How can we help you..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'form-input input-error' : 'form-input'}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary form-submit-btn">
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
