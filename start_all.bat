@echo off
echo ============================================================
echo Starting Vehicle Fraud Detection System (Backend + Frontend)
echo ============================================================

start "FastAPI Backend (Port 8000)" cmd /k "cd /d %~dp0BACKEND\ml\api && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

start "Vite React Frontend (Port 5173)" cmd /k "cd /d %~dp0FRONTEND\my-react-app && npm run dev"

echo.
echo Both services have been launched in separate console windows!
echo - Frontend:    http://localhost:5173
echo - Backend API: http://127.0.0.1:8000
echo - Swagger Docs:http://127.0.0.1:8000/docs
echo.
pause
