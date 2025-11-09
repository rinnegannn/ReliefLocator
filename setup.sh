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

# Check for required environment variables
echo "Checking environment variables..."
MISSING_VARS=()

if [ -z "$DATABASE_URL" ]; then
    MISSING_VARS+=("DATABASE_URL")
fi

if [ -z "$SESSION_SECRET" ]; then
    MISSING_VARS+=("SESSION_SECRET")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠ Missing environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "Please set these environment variables before running the application."
    echo "In Replit, you can add them in the Secrets tab (Tools > Secrets)"
else
    echo -e "${GREEN}✓ All required environment variables are set${NC}"
fi
echo ""

# Setup database
if [ -n "$DATABASE_URL" ]; then
    echo "Setting up database schema..."
    npm run db:push
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database schema created successfully${NC}"
    else
        echo -e "${RED}✗ Failed to create database schema${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠ Skipping database setup (DATABASE_URL not set)${NC}"
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
echo "  - Backend: Express, Drizzle ORM, PostgreSQL"
echo "  - 80+ total packages"
echo ""
echo "Next steps:"
echo "  1. Make sure environment variables are set:"
if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    for var in "${MISSING_VARS[@]}"; do
        echo "     - $var"
    done
fi
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Open the application in your browser"
echo ""
echo "For more information, see dependencies.md"
echo ""
