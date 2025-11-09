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

REM Check for required environment variables
echo Checking environment variables...
set MISSING_VARS=0

if "%DATABASE_URL%"=="" (
    echo [WARNING] Missing: DATABASE_URL
    set MISSING_VARS=1
)

if "%SESSION_SECRET%"=="" (
    echo [WARNING] Missing: SESSION_SECRET
    set MISSING_VARS=1
)

if %MISSING_VARS% EQU 1 (
    echo.
    echo Please set these environment variables before running the application.
) else (
    echo [OK] All required environment variables are set
)
echo.

REM Setup database
if not "%DATABASE_URL%"=="" (
    echo Setting up database schema...
    call npm run db:push
    
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Database schema created successfully
    ) else (
        echo [ERROR] Failed to create database schema
        exit /b 1
    )
) else (
    echo [WARNING] Skipping database setup (DATABASE_URL not set)
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
echo   - Backend: Express, Drizzle ORM, PostgreSQL
echo   - 80+ total packages
echo.
echo Next steps:
echo   1. Make sure environment variables are set
echo   2. Run 'npm run dev' to start the development server
echo   3. Open the application in your browser
echo.
echo For more information, see dependencies.md
echo.

pause
