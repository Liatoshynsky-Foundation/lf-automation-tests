#!/bin/bash

if [ -f .env ]; then
  set -a
  source .env
  set +a
  echo "Environment variables loaded from .env"
else
  echo "Warning: .env file not found, using default values"
fi

k6 run --out influxdb=http://localhost:8086/k6 scripts/test-k6.js