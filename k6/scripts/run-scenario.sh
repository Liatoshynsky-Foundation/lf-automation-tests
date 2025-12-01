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

if [ -z "$INFLUXDB_USER" ] || [ -z "$INFLUXDB_PASSWORD" ]; then
  echo "Error: INFLUXDB_USER and INFLUXDB_PASSWORD must be set in .env file"
  exit 1
fi

mkdir -p $RESULTS_DIR

echo "Running $SCENARIO test..."

k6 run \
  --out influxdb=http://${INFLUXDB_USER}:${INFLUXDB_PASSWORD}@${INFLUXDB_HOST}:${INFLUXDB_PORT}/${INFLUXDB_DB} \
  --out json=$RESULTS_DIR/${SCENARIO}_${TIMESTAMP}.json \
  --summary-export=$RESULTS_DIR/${SCENARIO}_summary_${TIMESTAMP}.json \
  scripts/scenarios/${SCENARIO}-test.js

echo "Test completed. Results saved to $RESULTS_DIR/"