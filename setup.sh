#!/bin/bash

# Post-Disaster Relief Resource Locator - Setup Script
# This script installs all dependencies and sets up the application

set -e  # Exit on error

echo "======================================"
echo "Relief Resource Locator - Setup"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js 18.x or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
echo ""

# Install dependencies
echo "Installing npm dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Check database configuration
echo "Checking database configuration..."
if [ -z "$DATABASE_URL" ]; then
    echo -e "${GREEN}✓ Using SQLite for local development${NC}"
    echo "  Database file: ./dev.db (auto-created on first run)"
    echo "  34 relief centers will be seeded automatically"
    echo ""
    echo -e "${YELLOW}ℹ For production: Set DATABASE_URL to use PostgreSQL/Neon${NC}"
else
    echo -e "${GREEN}✓ Using PostgreSQL database (from DATABASE_URL)${NC}"
    
    echo "Setting up database schema..."
    npm run db:push
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database schema created successfully${NC}"
    else
        echo -e "${RED}✗ Failed to create database schema${NC}"
        exit 1
    fi
fi
echo ""

# Check for SESSION_SECRET
echo "Checking session configuration..."
if [ -z "$SESSION_SECRET" ]; then
    echo -e "${YELLOW}⚠ SESSION_SECRET not set${NC}"
    echo "  A random secret will be generated (sessions won't persist across restarts)"
    echo "  For production: Set SESSION_SECRET to a secure random string"
else
    echo -e "${GREEN}✓ SESSION_SECRET is configured${NC}"
fi
echo ""

# Run type checking
echo "Running TypeScript type checking..."
npm run check

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Type checking passed${NC}"
else
    echo -e "${YELLOW}⚠ Type checking found issues (non-critical)${NC}"
fi
echo ""

# Summary
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "Installed packages:"
echo "  - Frontend: React 18, Vite, Wouter, TanStack Query"
echo "  - UI: Radix UI, Shadcn/ui, Tailwind CSS"
echo "  - Maps: Leaflet with OpenStreetMap"
echo "  - Backend: Express, Drizzle ORM"
echo "  - Database: SQLite (local) + PostgreSQL (production)"
echo "  - 85+ total packages"
echo ""
echo "Quick Start:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Open http://localhost:5000 in your browser"
echo "  3. The app will auto-create ./dev.db and seed 34 relief centers"
echo ""
echo "Production Deployment:"
echo "  - Set DATABASE_URL to your PostgreSQL/Neon connection string"
echo "  - Set SESSION_SECRET to a secure random string"
echo "  - Run 'npm run db:push' to create tables"
echo "  - Run 'npm start' for production mode"
echo ""
echo "For more information, see dependencies.md and README.md"
echo ""
