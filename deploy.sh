#!/bin/bash

echo "🌊 Yamfall Deployment Script"
echo "============================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Modern Yamfall"
    git branch -M main
fi

# Ask for GitHub repo URL
echo "📝 Enter your GitHub repository URL (e.g., https://github.com/sam0/yamfall.git):"
read REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No repository URL provided. Exiting."
    exit 1
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
    echo "🔗 Adding remote origin..."
    git remote add origin "$REPO_URL"
else
    echo "🔗 Remote origin already exists"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Now go to your GitHub repo settings and enable GitHub Pages."
echo "📍 Your site will be live at: https://YOUR-USERNAME.github.io/yamfall/"
echo ""
echo "🎉 Enjoy your new Yamfall!"
