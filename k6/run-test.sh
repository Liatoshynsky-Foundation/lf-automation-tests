#!/bin/bash
# filepath: k6/run-test.sh

if [ -f .env ]; then
  set -a
  source .env
  set +a
  echo "Environment variables loaded from .env"
else
  echo "Warning: .env file not found"
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESULTS_DIR="results"

mkdir -p $RESULTS_DIR

k6 run \
  --out json=$RESULTS_DIR/results_${TIMESTAMP}.json \
  --summary-export=$RESULTS_DIR/summary_${TIMESTAMP}.json \
  scripts/qa-client-stage.js > $RESULTS_DIR/report_${TIMESTAMP}.html

echo "Results saved to $RESULTS_DIR/"