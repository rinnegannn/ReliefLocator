@echo off
REM Post-Disaster Relief Resource Locator - Setup Script (Windows)
REM This script installs all dependencies and sets up the application

echo ======================================
echo Relief Resource Locator - Setup
echo ======================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18.x or higher from https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js installed: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm installed: %NPM_VERSION%
echo.

REM Install dependencies
echo Installing npm dependencies...
echo This may take a few minutes...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo [OK] Dependencies installed successfully
) else (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo.

REM Check database configuration
echo Checking database configuration...
if "%DATABASE_URL%"=="" (
    echo [OK] Using SQLite for local development
    echo   Database file: ./dev.db (auto-created on first run)
    echo   34 relief centers will be seeded automatically
    echo.
    echo [INFO] For production: Set DATABASE_URL to use PostgreSQL/Neon
) else (
    echo [OK] Using PostgreSQL database (from DATABASE_URL)
    
    echo Setting up database schema...
    call npm run db:push
    
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Database schema created successfully
    ) else (
        echo [ERROR] Failed to create database schema
        exit /b 1
    )
)
echo.

REM Check for SESSION_SECRET
echo Checking session configuration...
if "%SESSION_SECRET%"=="" (
    echo [WARNING] SESSION_SECRET not set
    echo   A random secret will be generated (sessions won't persist across restarts)
    echo   For production: Set SESSION_SECRET to a secure random string
) else (
    echo [OK] SESSION_SECRET is configured
)
echo.

REM Run type checking
echo Running TypeScript type checking...
call npm run check

if %ERRORLEVEL% EQU 0 (
    echo [OK] Type checking passed
) else (
    echo [WARNING] Type checking found issues (non-critical)
)
echo.

REM Summary
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Installed packages:
echo   - Frontend: React 18, Vite, Wouter, TanStack Query
echo   - UI: Radix UI, Shadcn/ui, Tailwind CSS
echo   - Maps: Leaflet with OpenStreetMap
echo   - Backend: Express, Drizzle ORM
echo   - Database: SQLite (local) + PostgreSQL (production)
echo   - 85+ total packages
echo.
echo Quick Start:
echo   1. Run 'npm run dev' to start the development server
echo   2. Open http://localhost:5000 in your browser
echo   3. The app will auto-create ./dev.db and seed 34 relief centers
echo.
echo Production Deployment:
echo   - Set DATABASE_URL to your PostgreSQL/Neon connection string
echo   - Set SESSION_SECRET to a secure random string
echo   - Run 'npm run db:push' to create tables
echo   - Run 'npm start' for production mode
echo.
echo For more information, see dependencies.md and README.md
echo.

pause
