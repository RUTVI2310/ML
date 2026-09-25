from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from pathlib import Path
import os

app = FastAPI(
    title="Vehicle Fraud Detection API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "model" / "vehicle_fraud_final_model.pkl"

try:
    model = joblib.load(MODEL_PATH)

    print("Model loaded successfully from:", MODEL_PATH)
    print("MODEL TYPE:", type(model))

except Exception as e:
    print("Error loading model:", e)
    model = None


class VehicleData(BaseModel):
    age_of_driver: int
    safety_rating: int
    annual_income: float
    high_education: int
    address_change: int
    property_status: str
    claim_date: str
    claim_day_of_week: str
    accident_site: str
    past_num_of_claims: int
    witness_present: int
    liab_prct: float
    channel: str
    police_report: int
    age_of_vehicle: int
    vehicle_category: str
    vehicle_price: float
    total_claim: float
    injury_claim: float
    policy_deductible: float
    annual_premium: float
    days_open: float
    form_defects: int


@app.get("/")
def home():
    return {
        "message": "Vehicle Fraud Detection API is running",
        "model_loaded": model is not None,
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)"
        }
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }


@app.post("/predict")
def predict(data: VehicleData):

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="ML model is not loaded."
        )

    try:

        input_data = pd.DataFrame([
            {
                "age_of_driver": data.age_of_driver,
                "safety_rating": data.safety_rating,
                "annual_income": data.annual_income,
                "high_education": data.high_education,
                "address_change": data.address_change,
                "property_status": data.property_status,
                "claim_date": data.claim_date,
                "claim_day_of_week": data.claim_day_of_week,
                "accident_site": data.accident_site,
                "past_num_of_claims": data.past_num_of_claims,
                "witness_present": data.witness_present,
                "liab_prct": data.liab_prct,
                "channel": data.channel,
                "police_report": data.police_report,
                "age_of_vehicle": data.age_of_vehicle,
                "vehicle_category": data.vehicle_category,
                "vehicle_price": data.vehicle_price,
                "total_claim": data.total_claim,
                "injury_claim": data.injury_claim,
                "policy_deductible": data.policy_deductible,
                "annual_premium": data.annual_premium,
                "days_open": data.days_open,
                "form_defects": data.form_defects
            }
        ])

        prediction = int(
            model.predict(input_data)[0]
        )

        result = (
            "Fraud"
            if prediction == 1
            else "Not Fraud"
        )

        fraud_probability = (
            100.0
            if prediction == 1
            else 0.0
        )

        if hasattr(model, "predict_proba"):

            try:

                probs = model.predict_proba(input_data)[0]

                classes = list(model.classes_)

                if 1 in classes:

                    fraud_idx = classes.index(1)

                    fraud_probability = round(
                        float(probs[fraud_idx]) * 100,
                        2
                    )

            except Exception as pe:

                print(
                    "Could not calculate probabilities:",
                    pe
                )

        return {
            "prediction": prediction,
            "result": result,
            "probability": fraud_probability,
            "model_name": "Decision Tree"
        }

    except Exception as e:

        print(
            "Prediction execution error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


if __name__ == "__main__":

    import uvicorn

    port = int(
        os.environ.get(
            "PORT",
            8000
        )
    )

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=port,
        reload=True
    )