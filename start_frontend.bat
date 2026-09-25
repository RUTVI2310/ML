@echo off
echo =======================================
echo Starting Vehicle Fraud Detection Frontend
echo URL: http://localhost:5173
echo =======================================
cd /d "%~dp0FRONTEND\my-react-app"
npm run dev
pause
