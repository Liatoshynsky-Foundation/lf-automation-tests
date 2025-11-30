#!/bin/bash

if [ -f .env ]; then
  set -a
  source .env
  set +a
  echo "✓ Environment variables loaded from .env"
else
  echo "⚠ Warning: .env file not found"
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="results"
SCENARIO=${1:-"qa-client-stage"}

mkdir -p $RESULTS_DIR

echo "=========================================="
echo "K6 Performance Test - With Monitoring"
echo "=========================================="
echo "Scenario: $SCENARIO"
echo "Timestamp: $TIMESTAMP"
echo "Target: $BASE_CLIENT_URL"
echo "=========================================="

k6 run \
  --out influxdb=http://admin:admin123@localhost:8086/k6 \
  --out json=$RESULTS_DIR/results_${TIMESTAMP}.json \
  --summary-export=$RESULTS_DIR/summary_${TIMESTAMP}.json \
  scripts/$SCENARIO.js

echo ""
echo "✓ Results saved to $RESULTS_DIR/"
echo "✓ View Grafana dashboard: http://localhost:3001"
echo "✓ InfluxDB: http://localhost:8086"