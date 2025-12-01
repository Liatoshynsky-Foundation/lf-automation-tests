#!/bin/bash

echo "Validating k6 environment setup..."

if [ ! -f .env ]; then
  echo "❌ Error: .env file not found"
  echo "Run: cp .env.example .env"
  exit 1
fi

source .env

REQUIRED_VARS=(
  "BASE_CLIENT_URL"
  "INFLUXDB_HOST"
  "INFLUXDB_PORT"
  "INFLUXDB_DB"
  "INFLUXDB_USER"
  "INFLUXDB_PASSWORD"
  "GRAFANA_PORT"
  "GRAFANA_USER"
  "GRAFANA_PASSWORD"
)

MISSING_VARS=()

for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    MISSING_VARS+=("$VAR")
  fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
  echo "❌ Missing required variables in .env:"
  printf '   - %s\n' "${MISSING_VARS[@]}"
  exit 1
fi

echo "✓ All required variables are set"
echo "✓ Environment configuration is valid"