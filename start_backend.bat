@echo off
echo =======================================
echo Starting Vehicle Fraud Detection Backend
echo URL: http://127.0.0.1:8000
echo API Docs: http://127.0.0.1:8000/docs
echo =======================================
cd /d "%~dp0BACKEND\ml\api"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
