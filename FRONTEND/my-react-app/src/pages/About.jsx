import { Database, Cpu, TrendingUp, Settings, ShieldAlert } from 'lucide-react';

export default function About() {
  const pipelineSteps = [
    { title: 'Raw Claim Data', desc: 'Direct claim logs and driver profiles' },
    { title: 'Data Cleaning', desc: 'Handling null variables & deduplication' },
    { title: 'Feature Processing', desc: 'Encoding categorical values & computing dynamic metrics' },
    { title: 'Train/Test Split', desc: 'Stratified 80/20 partition (random_state=42)' },
    { title: 'Logistic Regression', desc: 'Fitting coefficient matrices using balanced weights' },
    { title: 'Fraud Prediction', desc: 'Probability scores and evaluation outputs' },
  ];

  return (
    <div className="about-page animate-fade-in">
      <div className="container">
        {/* HEADER */}
        <div className="page-header">
          <h1 className="page-title">About FraudShield AI</h1>
          <p className="page-subtitle">
            Understand the machine learning framework, training parameters, and performance boundaries behind our claim detection engine.
          </p>
        </div>

        {/* PROJECT OVERVIEW */}
        <section className="about-section overview-card">
          <div className="section-card-body">
            <div className="card-icon-header">
              <ShieldAlert className="about-icon" size={32} />
              <h2>Project Overview</h2>
            </div>
            <p className="overview-text">
              <strong>FraudShield AI</strong> is a vehicle insurance claim fraud detection machine learning project designed to analyze claim-related information and classify claims as potentially fraudulent or non-fraudulent. The system provides risk-mitigation guidelines to adjusters by identifying anomalous features inside submitted filings.
            </p>
          </div>
        </section>

        {/* METRICS & DETAILS GRID */}
        <div className="about-grid">
          {/* DATASET CARD */}
          <div className="about-details-card">
            <div className="card-header">
              <Database className="card-icon" size={20} />
              <h3>Dataset Specifications</h3>
            </div>
            <div className="detail-list">
              <div className="detail-row">
                <span className="detail-name">Total Dataset Records</span>
                <span className="detail-val">12,002 Records</span>
              </div>
              <div className="detail-row">
                <span className="detail-name">Original Features Collected</span>
                <span className="detail-val">29 Columns</span>
              </div>
              <div className="detail-row">
                <span className="detail-name">Final Model Input Features</span>
                <span className="detail-val">24 Features</span>
              </div>
            </div>
          </div>

          {/* MACHINE LEARNING MODEL CARD */}
          <div className="about-details-card">
            <div className="card-header">
              <Cpu className="card-icon" size={20} />
              <h3>Model Configuration</h3>
            </div>
            <div className="detail-list">
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">Classifier</span>
                <span className="detail-val font-badge">Logistic Regression</span>
              </div>
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">C (Regularization strength)</span>
                <span className="detail-val font-mono">0.1</span>
              </div>
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">Class Weight Allocation</span>
                <span className="detail-val font-mono">"balanced"</span>
              </div>
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">Maximum Iterations</span>
                <span className="detail-val font-mono">1000</span>
              </div>
            </div>
          </div>

          {/* TRAINING CONFIGURATION */}
          <div className="about-details-card">
            <div className="card-header">
              <Settings className="card-icon" size={20} />
              <h3>Training Splits</h3>
            </div>
            <div className="detail-list">
              <div className="detail-row">
                <span className="detail-name">Train / Test Distribution</span>
                <span className="detail-val">80% / 20%</span>
              </div>
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">Random Seed (random_state)</span>
                <span className="detail-val font-mono">42</span>
              </div>
              <div className="detail-row font-mono-wrapper">
                <span className="detail-name">Stratification Scheme</span>
                <span className="detail-val font-mono">stratify = y</span>
              </div>
            </div>
          </div>

          {/* PERFORMANCE SCORES */}
          <div className="about-details-card highlight-card">
            <div className="card-header">
              <TrendingUp className="card-icon highlight-color" size={20} />
              <h3>Model Performance</h3>
            </div>
            <div className="detail-list">
              <div className="detail-row">
                <span className="detail-name">Training Accuracy</span>
                <span className="detail-val font-bold">57.14%</span>
              </div>
              <div className="detail-row">
                <span className="detail-name">Testing Accuracy</span>
                <span className="detail-val font-bold">53.56%</span>
              </div>
              <div className="detail-row">
                <span className="detail-name">Model Log Loss</span>
                <span className="detail-val font-bold text-mono">0.63995</span>
              </div>
            </div>
            <div className="card-footer-alert">
              <blockquote>
                [!NOTE]
                These represent the current real-world baseline model training results. They reflect the actual performance boundaries of a balanced Logistic Regression classifier on this challenging and noisy dataset. Performance metrics are not artificially inflated.
              </blockquote>
            </div>
          </div>
        </div>

        {/* PIPELINE TIMELINE */}
        <section className="pipeline-section">
          <h2>Data Processing & ML Pipeline</h2>
          <p className="pipeline-subtitle">
            From raw input fields to the evaluated prediction outcome, the lifecycle of a claim flows through these distinct stages:
          </p>

          <div className="pipeline-flow">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="pipeline-card-wrapper">
                <div className="pipeline-node">
                  <div className="node-dot">
                    <span>{idx + 1}</span>
                  </div>
                  <div className="node-content-card">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <div className="pipeline-connector">
                    <div className="connector-line"></div>
                    <div className="connector-arrow"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
