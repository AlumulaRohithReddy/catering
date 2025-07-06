#!/bin/bash

echo "🚀 Catering App Deployment Setup"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin YOUR_GITHUB_REPO_URL"
    echo "   git push -u origin main"
    exit 1
fi

# Check if .env files exist
echo "📋 Checking environment files..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Please create it with your environment variables."
    echo "   You can use backend/env.example as a template."
fi

# Check if all dependencies are installed
echo "📦 Checking dependencies..."

if [ ! -d "admin-frontend/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd admin-frontend
    npm install
    cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway (see DEPLOYMENT.md)"
echo "3. Deploy frontend to Vercel (see DEPLOYMENT.md)"
echo "4. Update configuration files with your actual URLs"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 