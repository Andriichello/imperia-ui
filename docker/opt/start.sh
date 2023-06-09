#!/bin/bash
set -euo pipefail

cd /var/www/imperia-ui

aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}

aws s3 --endpoint-url https://storage.googleapis.com cp s3://imperia-ui-secrets/.env.${ENV} .env

cat .env

nginx