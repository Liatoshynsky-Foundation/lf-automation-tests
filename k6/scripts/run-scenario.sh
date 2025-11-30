#!/bin/bash

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

SCENARIO=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="results"

if [ -z "$SCENARIO" ]; then
  echo "Usage: ./scripts/run-scenario.sh [smoke|load|stress|spike]"
  exit 1
fi

mkdir -p $RESULTS_DIR

echo "Running $SCENARIO test..."

k6 run \
  --out influxdb=http://admin:admin123@localhost:8086/k6 \
  --out json=$RESULTS_DIR/${SCENARIO}_${TIMESTAMP}.json \
  --summary-export=$RESULTS_DIR/${SCENARIO}_summary_${TIMESTAMP}.json \
  scripts/scenarios/${SCENARIO}-test.js

echo "Test completed. Results saved to $RESULTS_DIR/"