#!/bin/bash
set -euo pipefail

cd /var/www/imperia-ui

echo "setting up S3 credentials";
aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}

echo "loading .env from S3";
aws s3 --endpoint-url https://storage.googleapis.com cp s3://imperia-ui-secrets/.env.staging .env

# build app for production with minification
npm run build

npm run serve-80;