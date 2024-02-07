#!/bin/bash

# Deploy.sh

echo "Running Deployment Steps on the Server"

# Move to the project directory
cd /home/ubuntu/ApiKnight/ApiKnight

# Update the repository
echo "Pulling the latest changes from the repository"
git pull

# Install Dependencies
echo "Installing Dependencies"
git clean -fdx
pnpm install

# ESlint check
echo "Running ESlint check"
pnpm run lint:fix

# Vitest
echo "Running Vitest"
pnpm test:vitest

# Build the project
echo "Building the project"
pnpm run build

# Install Playwright Browsers
echo "Installing Playwright Browsers"
npx playwright install --with-deps

# Start server for testing the built app
echo "Starting the server for testing"
nohup pnpm run preview &
echo "Preview app started"
sleep 12

# Run Playwright tests
echo "Running Playwright tests"
pnpm run test

# Upload Playwright report artifact
echo "Uploading Playwright report artifact"
echo "This step should be handled by GitHub Actions artifact upload."

# Kill Server Process
echo "Killing the server process"
kill $(lsof -t -i:4173)
echo "Server process killed"

# Deploy to show
if [ "$branch" == "main" ]; then
    echo "Deploying to show"
    rm -rf dist
    mv ./dist ../
    cd ..
    chmod -R 777 ./dist
else
    echo "Skipping deployment to show. Branch is not main."
fi

echo "Deployment completed"
