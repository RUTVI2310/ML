import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  Cpu, 
  FileText,
  User,
  Car,
  DollarSign,
  ClipboardList,
  AlertCircle
} from 'lucide-react';

const BLANK_FORM_VALUES = {
  ageOfDriver: '',
  safetyRating: '',
  annualIncome: '',
  higherEducation: '',
  addressChange: '',
  propertyStatus: '',
  zipCode: '',
  claimDate: '',
  claimDayOfWeek: '',
  accidentSite: '',
  pastClaims: '',
  witnessPresent: '',
  liabilityPercent: '',
  channel: '',
  policeReport: '',
  ageOfVehicle: '',
  vehicleCategory: '',
  vehiclePrice: '',
  totalClaim: '',
  injuryClaim: '',
  policyDeductible: '',
  annualPremium: '',
  daysOpen: '',
  formDefects: ''
};

// Verified sample dataset records for instant testing
const SAMPLE_CLEAN = {
  ageOfDriver: '39',
  safetyRating: '73',
  annualIncome: '58612',
  higherEducation: 'Yes',
  addressChange: 'No',
  propertyStatus: 'Own',
  zipCode: '50048',
  claimDate: '2023-08-12',
  claimDayOfWeek: 'Saturday',
  accidentSite: 'Highway',
  pastClaims: '0',
  witnessPresent: 'No',
  liabilityPercent: '25',
  channel: 'Phone',
  policeReport: 'No',
  ageOfVehicle: '8',
  vehicleCategory: 'Large',
  vehiclePrice: '24360',
  totalClaim: '26633',
  injuryClaim: '5196',
  policyDeductible: '1000',
  annualPremium: '1406',
  daysOpen: '9',
  formDefects: '5'
};

const SAMPLE_FRAUD = {
  ageOfDriver: '33',
  safetyRating: '72',
  annualIncome: '35936',
  higherEducation: 'No',
  addressChange: 'Yes',
  propertyStatus: 'Own',
  zipCode: '50006',
  claimDate: '2024-10-18',
  claimDayOfWeek: 'Friday',
  accidentSite: 'Local',
  pastClaims: '0',
  witnessPresent: 'Yes',
  liabilityPercent: '45',
  channel: 'Phone',
  policeReport: 'No',
  ageOfVehicle: '2',
  vehicleCategory: 'Medium',
  vehiclePrice: '23457',
  totalClaim: '26707',
  injuryClaim: '7957',
  policyDeductible: '2000',
  annualPremium: '1415',
  daysOpen: '10',
  formDefects: '5'
};

export default function Prediction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(BLANK_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (formData.claimDate) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(formData.claimDate);
      if (!isNaN(date.getTime())) {
        const dayName = days[date.getUTCDay()];
        setFormData(prev => ({
          ...prev,
          claimDayOfWeek: dayName
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          claimDayOfWeek: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        claimDayOfWeek: ''
      }));
    }
  }, [formData.claimDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleLoadSample = (sampleType) => {
    if (sampleType === 'fraud') {
      setFormData(SAMPLE_FRAUD);
    } else {
      setFormData(SAMPLE_CLEAN);
    }
    setErrors({});
    setResult(null);
    setApiError(null);
  };

  const validateForm = () => {
    const tempErrors = {};
    const requiredFields = [
      'ageOfDriver', 'safetyRating', 'annualIncome', 'higherEducation', 
      'addressChange', 'propertyStatus', 'claimDate', 
      'accidentSite', 'pastClaims', 'witnessPresent', 'liabilityPercent', 
      'channel', 'policeReport', 'ageOfVehicle', 'vehicleCategory', 
      'vehiclePrice', 'totalClaim', 'injuryClaim', 'policyDeductible', 
      'annualPremium', 'daysOpen', 'formDefects'
    ];

    requiredFields.forEach(field => {
      if (formData[field] === '' || formData[field] === undefined || formData[field] === null) {
        tempErrors[field] = 'This field is required.';
      }
    });

    const nonNegativeFields = [
      'ageOfDriver', 'safetyRating', 'annualIncome', 'pastClaims', 
      'liabilityPercent', 'ageOfVehicle', 'vehiclePrice', 'totalClaim', 
      'injuryClaim', 'policyDeductible', 'annualPremium', 'daysOpen', 'formDefects'
    ];

    nonNegativeFields.forEach(field => {
      if (formData[field] !== '' && Number(formData[field]) < 0) {
        tempErrors[field] = 'Value cannot be negative.';
      }
    });

    if (formData.liabilityPercent !== '' && (Number(formData.liabilityPercent) < 0 || Number(formData.liabilityPercent) > 100)) {
      tempErrors.liabilityPercent = 'Percentage must be between 0 and 100.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setLoadingStage('Connecting to FastAPI backend...');
    setResult(null);

    const payload = {
      age_of_driver: Number(formData.ageOfDriver),
      safety_rating: Number(formData.safetyRating),
      annual_income: Number(formData.annualIncome),
      high_education: formData.higherEducation === 'Yes' ? 1 : 0,
      address_change: formData.addressChange === 'Yes' ? 1 : 0,
      property_status: formData.propertyStatus,
      claim_date: formData.claimDate
        ? (() => {
            const [year, month, day] = formData.claimDate.split('-');
            return `${Number(month)}/${Number(day)}/${year}`;
          })()
        : '',
      claim_day_of_week: formData.claimDayOfWeek,
      accident_site: formData.accidentSite,
      past_num_of_claims: Number(formData.pastClaims),
      witness_present: formData.witnessPresent === 'Yes' ? 1 : 0,
      liab_prct: Number(formData.liabilityPercent),
      channel: formData.channel,
      police_report: formData.policeReport === 'Yes' ? 1 : 0,
      age_of_vehicle: Number(formData.ageOfVehicle),
      vehicle_category: formData.vehicleCategory,
      vehicle_price: Number(formData.vehiclePrice),
      total_claim: Number(formData.totalClaim),
      injury_claim: Number(formData.injuryClaim),
      policy_deductible: Number(formData.policyDeductible),
      annual_premium: Number(formData.annualPremium),
      days_open: Number(formData.daysOpen),
      form_defects: Number(formData.formDefects)
    };

    const backendUrl = import.meta.env.VITE_API_URL || 'https://ml-zbi9.onrender.com/';

    try {
      setLoadingStage('Evaluating claim data with Decision Tree ML model...');
      const response = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const isFraud = data.prediction === 1;
      const fraudProb = data.probability !== undefined 
        ? Math.round(data.probability) 
        : (isFraud ? 100 : 0);

      setResult({
        isFraud,
        probability: fraudProb,
        modelUsed: data.model_name || 'Decision Tree',
        recommendation: isFraud ? 'Review Recommended' : 'Standard Claims Processing',
        status: data.result
      });
    } catch (error) {
      console.error('Prediction connection error:', error);
      setApiError(
        `Unable to connect to backend API at ${backendUrl}. Please ensure the FastAPI server is running (python BACKEND/ml/api/main.py).`
      );
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  const handleReset = () => {
    setFormData(BLANK_FORM_VALUES);
    setErrors({});
    setResult(null);
    setApiError(null);
  };

  return (
    <div className="prediction-page animate-fade-in">
      <div className="container">
        {/* HEADER */}
        <div className="page-header">
          <h1 className="page-title">Vehicle Insurance Fraud Detection</h1>
          <p className="page-subtitle">
            Enter claim parameters below or use pre-filled samples to evaluate potential fraud risk using our AI model.
          </p>
        </div>

        {/* API ERROR BANNER */}
        {apiError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '0.5rem',
            color: '#f87171',
            fontSize: '0.95rem'
          }}>
            <AlertCircle size={22} style={{ flexShrink: 0 }} />
            <span>{apiError}</span>
          </div>
        )}

        {/* LOADING SCREEN */}
        {loading && (
          <div className="prediction-loading-overlay">
            <div className="loading-card">
              <RefreshCw className="spinner-icon" size={48} />
              <h3>Analyzing Claim Data</h3>
              <p className="loading-stage-text">{loadingStage}</p>
              <div className="progress-bar-track">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          </div>
        )}

        {/* PREDICTION RESULT CARD */}
        {result && (
          <div className={`result-card-section animate-slide-up ${result.isFraud ? 'status-fraud' : 'status-clean'}`}>
            <div className="result-card-header">
              <h2>Claim Analysis Result</h2>
              <span className="demo-badge-disclaimer">Live prediction from FastAPI ML Backend</span>
            </div>

            <div className="result-card-content">
              {/* Circular Ring Gauge */}
              <div className="result-gauge-wrapper">
                <svg className="result-gauge-svg" viewBox="0 0 120 120">
                  <circle className="gauge-bg" cx="60" cy="60" r="50"></circle>
                  <circle 
                    className="gauge-fill" 
                    cx="60" 
                    cy="60" 
                    r="50"
                    style={{
                      strokeDasharray: '314.16',
                      strokeDashoffset: (314.16 - (314.16 * result.probability) / 100).toString()
                    }}
                  ></circle>
                </svg>
                <div className="gauge-text-overlay">
                  <span className="gauge-percentage">{result.probability}%</span>
                  <span className="gauge-label">Fraud Risk</span>
                </div>
              </div>

              {/* Text Metrics */}
              <div className="result-metrics-details">
                <div className="result-badge-display">
                  {result.isFraud ? (
                    <div className="badge-flag fraud">
                      <ShieldAlert size={18} />
                      <span>Potential Fraud Detected</span>
                    </div>
                  ) : (
                    <div className="badge-flag clean">
                      <ShieldCheck size={18} />
                      <span>No Fraud Detected</span>
                    </div>
                  )}
                </div>

                <div className="result-info-grid">
                  <div className="result-info-row">
                    <span className="info-label">Model Engine:</span>
                    <span className="info-value font-mono">{result.modelUsed}</span>
                  </div>
                  <div className="result-info-row">
                    <span className="info-label">System Recommendation:</span>
                    <span className="info-value font-bold">{result.recommendation}</span>
                  </div>
                  <div className="result-info-row">
                    <span className="info-label">Details:</span>
                    <span className="info-value">{result.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-actions-row">
              <button className="btn-primary" onClick={() => setResult(null)}>
                Analyze Another Claim
              </button>
              <button className="btn-secondary" onClick={handleReset}>
                Reset Form
              </button>
              <button className="btn-tertiary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        )}

        {/* INPUT FORM */}
        {!result && (
          <form onSubmit={handleAnalyze} noValidate className="prediction-form-wrapper">
            
            {/* QUICK PRE-FILL SAMPLES BAR */}
            <div className="form-action-header">
              <span className="form-legend-text">
                Quick Test Samples:
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-secondary load-demo-btn"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                  onClick={() => handleLoadSample('clean')}
                >
                  Load Clean Claim Sample
                </button>
                <button
                  type="button"
                  className="btn-secondary load-demo-btn"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', borderColor: '#f59e0b', color: '#f59e0b' }}
                  onClick={() => handleLoadSample('fraud')}
                >
                  Load Fraud Claim Sample
                </button>
              </div>
            </div>

            {/* SECTION 1: DRIVER PROFILE */}
            <fieldset className="form-section">
              <legend>
                <User size={18} className="legend-icon" />
                <span>Driver Profile</span>
              </legend>
              <div className="form-fields-grid">
                {/* Age of Driver */}
                <div className="form-group">
                  <label htmlFor="ageOfDriver">Age of Driver *</label>
                  <input
                    type="number"
                    id="ageOfDriver"
                    name="ageOfDriver"
                    min="0"
                    placeholder="35"
                    value={formData.ageOfDriver}
                    onChange={handleChange}
                    className={errors.ageOfDriver ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.ageOfDriver && <span className="error-message">{errors.ageOfDriver}</span>}
                </div>

                {/* Safety Rating */}
                <div className="form-group">
                  <label htmlFor="safetyRating">Safety Rating (0-100) *</label>
                  <input
                    type="number"
                    id="safetyRating"
                    name="safetyRating"
                    min="0"
                    max="100"
                    placeholder="73"
                    value={formData.safetyRating}
                    onChange={handleChange}
                    className={errors.safetyRating ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.safetyRating && <span className="error-message">{errors.safetyRating}</span>}
                </div>

                {/* Annual Income */}
                <div className="form-group">
                  <label htmlFor="annualIncome">Annual Income ($) *</label>
                  <input
                    type="number"
                    id="annualIncome"
                    name="annualIncome"
                    min="0"
                    step="any"
                    placeholder="65000"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className={errors.annualIncome ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.annualIncome && <span className="error-message">{errors.annualIncome}</span>}
                </div>

                {/* Higher Education */}
                <div className="form-group">
                  <label htmlFor="higherEducation">Higher Education Completed *</label>
                  <select
                    id="higherEducation"
                    name="higherEducation"
                    value={formData.higherEducation}
                    onChange={handleChange}
                    className={errors.higherEducation ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.higherEducation && <span className="error-message">{errors.higherEducation}</span>}
                </div>

                {/* Address Change */}
                <div className="form-group">
                  <label htmlFor="addressChange">Recent Address Change *</label>
                  <select
                    id="addressChange"
                    name="addressChange"
                    value={formData.addressChange}
                    onChange={handleChange}
                    className={errors.addressChange ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.addressChange && <span className="error-message">{errors.addressChange}</span>}
                </div>

                {/* Property Status */}
                <div className="form-group">
                  <label htmlFor="propertyStatus">Property Status *</label>
                  <select
                    id="propertyStatus"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    className={errors.propertyStatus ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select option</option>
                    <option value="Own">Own</option>
                    <option value="Rent">Rent</option>
                  </select>
                  {errors.propertyStatus && <span className="error-message">{errors.propertyStatus}</span>}
                </div>

              </div>
            </fieldset>

            {/* SECTION 2: CLAIM INFORMATION */}
            <fieldset className="form-section">
              <legend>
                <FileText size={18} className="legend-icon" />
                <span>Claim Information</span>
              </legend>
              <div className="form-fields-grid">
                {/* Claim Date */}
                <div className="form-group">
                  <label htmlFor="claimDate">Claim Date *</label>
                  <input
                    type="date"
                    id="claimDate"
                    name="claimDate"
                    value={formData.claimDate}
                    onChange={handleChange}
                    className={errors.claimDate ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.claimDate && <span className="error-message">{errors.claimDate}</span>}
                </div>

                {/* Claim Day of Week (Auto-calculated) */}
                <div className="form-group">
                  <label htmlFor="claimDayOfWeek">Claim Day of Week (Auto)</label>
                  <input
                    type="text"
                    id="claimDayOfWeek"
                    name="claimDayOfWeek"
                    value={formData.claimDayOfWeek}
                    readOnly
                    className="form-input read-only-input"
                    placeholder="Calculated automatically"
                  />
                </div>

                {/* Accident Site */}
                <div className="form-group">
                  <label htmlFor="accidentSite">Accident Site *</label>
                  <select
                    id="accidentSite"
                    name="accidentSite"
                    value={formData.accidentSite}
                    onChange={handleChange}
                    className={errors.accidentSite ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select site</option>
                    <option value="Highway">Highway</option>
                    <option value="Local">Local</option>
                    <option value="Parking Lot">Parking Lot</option>
                  </select>
                  {errors.accidentSite && <span className="error-message">{errors.accidentSite}</span>}
                </div>

                {/* Past Number of Claims */}
                <div className="form-group">
                  <label htmlFor="pastClaims">Past Number of Claims *</label>
                  <input
                    type="number"
                    id="pastClaims"
                    name="pastClaims"
                    min="0"
                    placeholder="1"
                    value={formData.pastClaims}
                    onChange={handleChange}
                    className={errors.pastClaims ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.pastClaims && <span className="error-message">{errors.pastClaims}</span>}
                </div>

                {/* Witness Present */}
                <div className="form-group">
                  <label htmlFor="witnessPresent">Witness Present *</label>
                  <select
                    id="witnessPresent"
                    name="witnessPresent"
                    value={formData.witnessPresent}
                    onChange={handleChange}
                    className={errors.witnessPresent ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.witnessPresent && <span className="error-message">{errors.witnessPresent}</span>}
                </div>

                {/* Liability Percentage */}
                <div className="form-group">
                  <label htmlFor="liabilityPercent">Liability Percentage (0-100) *</label>
                  <input
                    type="number"
                    id="liabilityPercent"
                    name="liabilityPercent"
                    min="0"
                    max="100"
                    placeholder="70"
                    value={formData.liabilityPercent}
                    onChange={handleChange}
                    className={errors.liabilityPercent ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.liabilityPercent && <span className="error-message">{errors.liabilityPercent}</span>}
                </div>

                {/* Channel */}
                <div className="form-group">
                  <label htmlFor="channel">Filing Channel *</label>
                  <select
                    id="channel"
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    className={errors.channel ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select channel</option>
                    <option value="Online">Online</option>
                    <option value="Phone">Phone</option>
                    <option value="Broker">Broker</option>
                  </select>
                  {errors.channel && <span className="error-message">{errors.channel}</span>}
                </div>

                {/* Police Report */}
                <div className="form-group">
                  <label htmlFor="policeReport">Police Report Filed *</label>
                  <select
                    id="policeReport"
                    name="policeReport"
                    value={formData.policeReport}
                    onChange={handleChange}
                    className={errors.policeReport ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.policeReport && <span className="error-message">{errors.policeReport}</span>}
                </div>
              </div>
            </fieldset>

            {/* SECTION 3: VEHICLE INFORMATION */}
            <fieldset className="form-section">
              <legend>
                <Car size={18} className="legend-icon" />
                <span>Vehicle Information</span>
              </legend>
              <div className="form-fields-grid">
                {/* Age of Vehicle */}
                <div className="form-group">
                  <label htmlFor="ageOfVehicle">Age of Vehicle (years) *</label>
                  <input
                    type="number"
                    id="ageOfVehicle"
                    name="ageOfVehicle"
                    min="0"
                    placeholder="5"
                    value={formData.ageOfVehicle}
                    onChange={handleChange}
                    className={errors.ageOfVehicle ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.ageOfVehicle && <span className="error-message">{errors.ageOfVehicle}</span>}
                </div>

                {/* Vehicle Category */}
                <div className="form-group">
                  <label htmlFor="vehicleCategory">Vehicle Category *</label>
                  <select
                    id="vehicleCategory"
                    name="vehicleCategory"
                    value={formData.vehicleCategory}
                    onChange={handleChange}
                    className={errors.vehicleCategory ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select category</option>
                    <option value="Compact">Compact</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                  {errors.vehicleCategory && <span className="error-message">{errors.vehicleCategory}</span>}
                </div>

                {/* Vehicle Price */}
                <div className="form-group">
                  <label htmlFor="vehiclePrice">Vehicle Price ($) *</label>
                  <input
                    type="number"
                    id="vehiclePrice"
                    name="vehiclePrice"
                    min="0"
                    placeholder="28000"
                    value={formData.vehiclePrice}
                    onChange={handleChange}
                    className={errors.vehiclePrice ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.vehiclePrice && <span className="error-message">{errors.vehiclePrice}</span>}
                </div>
              </div>
            </fieldset>

            {/* SECTION 4: FINANCIAL INFORMATION */}
            <fieldset className="form-section">
              <legend>
                <DollarSign size={18} className="legend-icon" />
                <span>Financial Information</span>
              </legend>
              <div className="form-fields-grid">
                {/* Total Claim */}
                <div className="form-group">
                  <label htmlFor="totalClaim">Total Claim Value ($) *</label>
                  <input
                    type="number"
                    id="totalClaim"
                    name="totalClaim"
                    min="0"
                    step="any"
                    placeholder="12500"
                    value={formData.totalClaim}
                    onChange={handleChange}
                    className={errors.totalClaim ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.totalClaim && <span className="error-message">{errors.totalClaim}</span>}
                </div>

                {/* Injury Claim */}
                <div className="form-group">
                  <label htmlFor="injuryClaim">Injury Claim Portion ($) *</label>
                  <input
                    type="number"
                    id="injuryClaim"
                    name="injuryClaim"
                    min="0"
                    step="any"
                    placeholder="3500"
                    value={formData.injuryClaim}
                    onChange={handleChange}
                    className={errors.injuryClaim ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.injuryClaim && <span className="error-message">{errors.injuryClaim}</span>}
                </div>

                {/* Policy Deductible */}
                <div className="form-group">
                  <label htmlFor="policyDeductible">Policy Deductible ($) *</label>
                  <select
                    id="policyDeductible"
                    name="policyDeductible"
                    value={formData.policyDeductible}
                    onChange={handleChange}
                    className={errors.policyDeductible ? 'form-input input-error' : 'form-input'}
                  >
                    <option value="">Select deductible</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                  </select>
                  {errors.policyDeductible && <span className="error-message">{errors.policyDeductible}</span>}
                </div>

                {/* Annual Premium */}
                <div className="form-group">
                  <label htmlFor="annualPremium">Annual Premium ($) *</label>
                  <input
                    type="number"
                    id="annualPremium"
                    name="annualPremium"
                    min="0"
                    step="any"
                    placeholder="1450"
                    value={formData.annualPremium}
                    onChange={handleChange}
                    className={errors.annualPremium ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.annualPremium && <span className="error-message">{errors.annualPremium}</span>}
                </div>
              </div>
            </fieldset>

            {/* SECTION 5: CLAIM PROCESS */}
            <fieldset className="form-section">
              <legend>
                <ClipboardList size={18} className="legend-icon" />
                <span>Claim Process</span>
              </legend>
              <div className="form-fields-grid">
                {/* Days Open */}
                <div className="form-group">
                  <label htmlFor="daysOpen">Days Open *</label>
                  <input
                    type="number"
                    id="daysOpen"
                    name="daysOpen"
                    min="0"
                    placeholder="18"
                    value={formData.daysOpen}
                    onChange={handleChange}
                    className={errors.daysOpen ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.daysOpen && <span className="error-message">{errors.daysOpen}</span>}
                </div>

                {/* Form Defects */}
                <div className="form-group">
                  <label htmlFor="formDefects">Form Defects Counter *</label>
                  <input
                    type="number"
                    id="formDefects"
                    name="formDefects"
                    min="0"
                    placeholder="1"
                    value={formData.formDefects}
                    onChange={handleChange}
                    className={errors.formDefects ? 'form-input input-error' : 'form-input'}
                  />
                  {errors.formDefects && <span className="error-message">{errors.formDefects}</span>}
                </div>
              </div>
            </fieldset>

            {/* FORM ACTIONS */}
            <div className="form-footer-actions">
              <button type="submit" className="btn-primary form-submit-cta">
                <Cpu size={18} />
                <span>Analyze Claim</span>
              </button>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                Reset Form
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
