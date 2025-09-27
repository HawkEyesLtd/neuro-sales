#!/bin/bash

# CSP Testing and Deployment Script
# This script helps test and deploy your application with proper CSP configuration

echo "🛡️  CSP Configuration and Testing Script"
echo "========================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command_exists pnpm; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

if ! command_exists vercel; then
    echo "⚠️  Vercel CLI not found. Installing globally..."
    npm install -g vercel
fi

# Function to test CSP configuration
test_csp() {
    echo "🧪 Testing CSP configuration..."

    # Build the application
    echo "📦 Building application..."
    pnpm build

    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please check your code."
        exit 1
    fi

    # Start preview server
    echo "🌐 Starting preview server..."
    pnpm preview --host --port 4173 &
    PREVIEW_PID=$!

    # Wait for server to start
    sleep 5

    # Test with curl for CSP headers
    echo "🔍 Testing CSP headers..."
    curl -I http://localhost:4173 | grep -i "content-security-policy"

    echo "✅ Preview server running at http://localhost:4173"
    echo "🔍 Please test the following:"
    echo "   - Google Fonts loading correctly"
    echo "   - No console errors related to CSP"
    echo "   - All components rendering properly"
    echo "   - Ant Design styles working"
    echo ""
    echo "Press Enter when testing is complete..."
    read -r

    # Kill preview server
    kill $PREVIEW_PID 2>/dev/null
    echo "🛑 Preview server stopped"
}

# Function to deploy with CSP
deploy_with_csp() {
    local config_file=${1:-"vercel.json"}

    echo "🚀 Deploying with CSP configuration: $config_file"

    if [ ! -f "$config_file" ]; then
        echo "❌ Configuration file $config_file not found!"
        exit 1
    fi

    # Backup current vercel.json if using alternative config
    if [ "$config_file" != "vercel.json" ]; then
        cp vercel.json vercel.json.backup
        cp "$config_file" vercel.json
    fi

    # Deploy to Vercel
    vercel --prod

    # Restore backup if needed
    if [ "$config_file" != "vercel.json" ] && [ -f "vercel.json.backup" ]; then
        mv vercel.json.backup vercel.json
    fi

    echo "✅ Deployment complete!"
    echo "🔍 Please test your deployed application for:"
    echo "   - Font loading"
    echo "   - Style rendering"
    echo "   - JavaScript functionality"
    echo "   - Console errors"
}

# Main menu
echo ""
echo "What would you like to do?"
echo "1) Test CSP configuration locally"
echo "2) Deploy with standard CSP (vercel.json)"
echo "3) Deploy with secure CSP (vercel.secure.json)"
echo "4) Check current CSP policy"
echo "5) Exit"
echo ""
read -p "Choose an option (1-5): " choice

case $choice in
    1)
        test_csp
        ;;
    2)
        deploy_with_csp "vercel.json"
        ;;
    3)
        deploy_with_csp "vercel.secure.json"
        ;;
    4)
        echo "📜 Current CSP policy in vercel.json:"
        grep -A 3 "Content-Security-Policy" vercel.json | sed 's/^/   /'
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-5."
        ;;
esac
