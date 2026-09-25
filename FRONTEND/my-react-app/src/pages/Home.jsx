import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Brain, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Database, 
  Award, 
  Cpu, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  GitBranch, 
  UserCheck 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // Statistics Data with specific icons and styling
  const stats = [
    { value: '12,002', label: 'Dataset Records', desc: 'Total historical claim files', icon: <Database size={20} className="stat-icon" /> },
    { value: '29', label: 'Original Features', desc: 'Collected variables', icon: <Sliders size={20} className="stat-icon" /> },
    { value: '24', label: 'Model Input Features', desc: 'Processed features selected', icon: <Cpu size={20} className="stat-icon" /> },
    { value: '80/20', label: 'Train/Test Split', desc: 'Distribution of data split', icon: <GitBranch size={20} className="stat-icon" /> },
    { value: '57.14%', label: 'Training Accuracy', desc: 'Performance on training set', icon: <UserCheck size={20} className="stat-icon" /> },
    { value: '53.56%', label: 'Testing Accuracy', desc: 'Performance on testing set', icon: <TrendingUp size={20} className="stat-icon" /> },
    { value: '0.63995', label: 'Log Loss', desc: 'Cross-entropy error metric', icon: <Activity size={20} className="stat-icon" /> },
  ];

  // How it works steps
  const steps = [
    { number: '01', title: 'Claim Data Intake', desc: 'Enter driver profiles, vehicle specs, and detailed accident circumstances into the portal.', icon: <FileText size={24} /> },
    { number: '02', title: 'Feature Alignment', desc: 'System automatically parses dates, calculates day of week, and normalizes financial parameters.', icon: <Sliders size={24} /> },
    { number: '03', title: 'Regression Evaluation', desc: 'The pre-trained Logistic Regression algorithm processes coefficients across all 24 weights.', icon: <Cpu size={24} /> },
    { number: '04', title: 'Probability & Flagging', desc: 'Review predicted probability values alongside recommended adjuster action workflows.', icon: <Shield size={24} /> },
  ];

  // Feature Categories preview with specific styling metadata
  const featuresOverview = [
    {
      category: 'Driver Profile',
      desc: 'Personal indicators',
      icon: <UserCheck size={18} className="feat-cat-icon icon-blue" />,
      examples: ['Age of Driver', 'Safety Rating', 'Annual Income', 'Higher Education'],
    },
    {
      category: 'Claim Information',
      desc: 'Filing details',
      icon: <FileText size={18} className="feat-cat-icon icon-cyan" />,
      examples: ['Claim Date', 'Accident Site', 'Witness Present', 'Liability %'],
    },
    {
      category: 'Vehicle Information',
      desc: 'Specs & valuation',
      icon: <GitBranch size={18} className="feat-cat-icon icon-purple" />,
      examples: ['Age of Vehicle', 'Vehicle Category', 'Vehicle Price'],
    },
    {
      category: 'Financial Information',
      desc: 'Loss values',
      icon: <Activity size={18} className="feat-cat-icon icon-emerald" />,
      examples: ['Total Claim Value', 'Injury Claim', 'Policy Deductible'],
    },
    {
      category: 'Claim Process',
      desc: 'Administrative actions',
      icon: <Sliders size={18} className="feat-cat-icon icon-orange" />,
      examples: ['Days Open', 'Form Defects Counter'],
    },
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Decorative Grid Mesh Background */}
        <div className="hero-grid-overlay"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="pulse-dot"></span>
              AI-POWERED INSURANCE FRAUD DETECTION
            </span>
            <h1 className="hero-title">
              Detect Suspicious <br />
              <span className="gradient-text">Insurance Claims</span> with AI
            </h1>
            <p className="hero-description">
              Verify claims in real-time. Use statistical Logistic Regression parameters to identify suspicious factors in vehicle accidents, property liabilities, and financial payouts.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/prediction')}>
                Analyze a Claim <ChevronRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => navigate('/about')}>
                Explore the Model
              </button>
            </div>

            {/* Live Model Telemetry Dashboard */}
            <div className="telemetry-card">
              <div className="telemetry-header">
                <div className="pulse-wrapper">
                  <span className="telemetry-pulse"></span>
                  <span className="telemetry-pulse-ring"></span>
                </div>
                <span>Detection Engine Live Telemetry</span>
              </div>
              <div className="telemetry-details">
                <div className="telemetry-cell">
                  <span className="telemetry-label">Classifier</span>
                  <span className="telemetry-val">Logistic Regression</span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-label">Model Status</span>
                  <span className="telemetry-val text-success">Online & Operational</span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-label">Baseline Latency</span>
                  <span className="telemetry-val font-mono">1.2ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Premium Visual Dashboard Showcase */}
          <div className="hero-dashboard-visual">
            <div className="glow-backdrop g-blue"></div>
            <div className="glow-backdrop g-purple"></div>
            
            <div className="dashboard-window-mockup">
              {/* Window Header */}
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="window-title">fraudshield-dashboard.ai</span>
              </div>
              
              {/* Window Content */}
              <div className="window-content">
                
                {/* Visual Chart 1: Premium Donut Gauge */}
                <div className="mini-card mini-donut-card">
                  <div className="mini-card-label">Overall Evaluation Risk</div>
                  <div className="donut-showcase-container">
                    <div className="donut-gauge-wrapper-hero">
                      <svg viewBox="0 0 36 36" className="circular-chart-hero">
                        <defs>
                          <linearGradient id="donutGradientHero" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                          <filter id="glowEffect">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.7" floodColor="#ef4444" floodOpacity="0.4"/>
                          </filter>
                        </defs>
                        <circle className="circle-bg-hero" cx="18" cy="18" r="15.915" />
                        <circle 
                          className="circle-fill-hero" 
                          cx="18" 
                          cy="18" 
                          r="15.915" 
                          stroke="url(#donutGradientHero)" 
                          strokeDasharray="72.4, 100"
                          filter="url(#glowEffect)"
                        />
                      </svg>
                      <div className="donut-center-content">
                        <span className="donut-pct">72%</span>
                        <span className="donut-sublabel">RISK</span>
                      </div>
                    </div>
                    
                    <div className="donut-details-hero">
                      <span className="donut-status-badge">Review Flags Active</span>
                      <p className="donut-subtext">Logistic Regression Core Matrix</p>
                    </div>
                  </div>
                </div>

                {/* Visual Chart 2: Live Bar graph */}
                <div className="mini-card mini-chart-card">
                  <div className="mini-card-label">Anomalies Detected / Day</div>
                  <div className="bar-graph-mock">
                    <div className="bar-col" style={{ height: '30%' }}></div>
                    <div className="bar-col" style={{ height: '55%' }}></div>
                    <div className="bar-col" style={{ height: '80%' }}></div>
                    <div className="bar-col highlight" style={{ height: '95%' }}></div>
                    <div className="bar-col" style={{ height: '40%' }}></div>
                  </div>
                </div>

                {/* Visual Chart 3: Active Document Log */}
                <div className="mini-card mini-log-card">
                  <div className="mini-card-label font-bold">Latest Analysis Scan</div>
                  <div className="log-row success">
                    <CheckCircle2 size={12} className="text-success" />
                    <span>Claim #1209 passed inspection</span>
                  </div>
                  <div className="log-row danger">
                    <AlertTriangle size={12} className="text-danger" />
                    <span>Claim #1210 flagged: High Liability</span>
                  </div>
                </div>

                {/* Center Core Scanner Icon */}
                <div className="dashboard-floating-badge">
                  <div className="badge-shield-wrapper">
                    <Shield size={28} className="shield-icon" />
                    <Brain size={18} className="brain-icon" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Model Attributes</span>
            <h2 className="section-title">Verified Project Metrics</h2>
            <p className="section-description">
              Our evaluation figures are extracted from the baseline Logistic Regression model configurations. No exaggerated performance numbers are added.
            </p>
          </div>
          <div className="stats-grid-container">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <p className="stat-desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">System Workflow</span>
            <h2 className="section-title">Step-by-Step Execution</h2>
            <p className="section-description">
              FraudShield AI evaluates claim integrity by checking mathematical parameters against calibrated weight matrices.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-icon-bg">
                  {step.icon}
                </div>
                <div className="step-number-tag">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CATEGORIES PREVIEW SECTION */}
      <section className="features-preview-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Statistical Dimensions</span>
            <h2 className="section-title">Analyzed Feature Domains</h2>
            <p className="section-description">
              We process 24 specific model input variables mapped across these 5 core domains to profile claim compliance.
            </p>
          </div>
          
          <div className="features-preview-grid">
            {featuresOverview.map((item, idx) => (
              <div key={idx} className="feature-category-card">
                <div className="feature-category-header">
                  <div className="feat-icon-container">
                    {item.icon}
                  </div>
                  <div className="feat-header-text">
                    <h3>{item.category}</h3>
                    <span className="feat-cat-subtitle">{item.desc}</span>
                  </div>
                </div>
                <ul className="feature-category-list">
                  {item.examples.map((example, fIdx) => (
                    <li key={fIdx} className="feature-category-item">
                      <span className="bullet"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="features-preview-action">
            <button className="btn-secondary flex-center" onClick={() => navigate('/prediction')}>
              View All 24 Inputs <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-grid-glow"></div>
          <div className="cta-content">
            <h2>Evaluate Claim Risk Instantly</h2>
            <p>
              Input parameters like driver safety ratings, vehicle valuations, deductibles, and open days to run predictions.
            </p>
            <button className="btn-primary" onClick={() => navigate('/prediction')}>
              Start Risk Evaluation <Play size={16} className="btn-icon-right" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
