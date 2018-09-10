#!/bin/bash

# Build React app
node scripts/build.js

# Copy everything from 'build' to 'public' folder
echo "Copying files..."
cp -rf build/* ./public

# Where branch am I?
CURRENT_BRANCH="$(git branch | grep \* | cut -d ' ' -f2)"

# Deployment branch name
DEPLOYMENT_BRANCH="deployment"

# Does deployment branch exist?
EXISTS=`git show-ref refs/heads/${DEPLOYMENT_BRANCH}`
if [ ! -n "$EXISTS" ]; then
  # Create it
  git branch ${DEPLOYMENT_BRANCH}
fi

# Checkout deployment branch
git checkout ${DEPLOYMENT_BRANCH}

# Record this deployment as a commit
git add . && git commit -m "Deployed at `date +%Y%m%d%H%M%S`"

# Make sure you have set credentials and already installed the SDK
# https://cloud.google.com/sdk/
gcloud app deploy

# Deployment done, back to previous branch
git checkout ${CURRENT_BRANCH}