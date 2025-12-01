#!/bin/bash

if [ -f .env ]; then
  set -a
  source .env
  set +a
  echo "✓ Environment variables loaded from .env"
else
  echo "⚠ Warning: .env file not found"
  exit 1
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="results"
SCENARIO=${1:-"qa-client-stage"}

if [ -z "$INFLUXDB_USER" ] || [ -z "$INFLUXDB_PASSWORD" ]; then
  echo "Error: INFLUXDB_USER and INFLUXDB_PASSWORD must be set in .env file"
  exit 1
fi

mkdir -p $RESULTS_DIR

echo "=========================================="
echo "K6 Performance Test - With Monitoring"
echo "=========================================="
echo "Scenario: $SCENARIO"
echo "Timestamp: $TIMESTAMP"
echo "Target: $BASE_CLIENT_URL"
echo "=========================================="

k6 run \
  --out influxdb=http://${INFLUXDB_USER}:${INFLUXDB_PASSWORD}@${INFLUXDB_HOST}:${INFLUXDB_PORT}/${INFLUXDB_DB} \
  --out json=$RESULTS_DIR/results_${TIMESTAMP}.json \
  --summary-export=$RESULTS_DIR/summary_${TIMESTAMP}.json \
  scripts/$SCENARIO.js

echo ""
echo "✓ Results saved to $RESULTS_DIR/"
echo "✓ View Grafana dashboard: http://localhost:${GRAFANA_PORT}"
echo "✓ InfluxDB: http://localhost:${INFLUXDB_PORT}"