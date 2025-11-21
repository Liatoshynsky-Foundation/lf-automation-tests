# k6 Performance Tests

This folder contains load and stress test scripts and supporting configs for running k6 tests locally or in CI.

Important: Run these tests only against environments you own or are authorized to test. Do NOT run DDoS-style tests against third-party systems.

## Directory layout

- scripts/
  - stress-test.js # Example stress / DDoS-like scenario
- docker-compose.yml # Local InfluxDB + Grafana + k6 runner
- Makefile # Helper commands for local dev
- .gitignore # Ignored k6 artifacts
- README.k6.md # This file

## Run Basic Test

- to run test with .env file:
- chmod +x k6/run-test.sh
- cd k6/
- ./run-test.sh

# Quick start (local)

1. Set target URL:
   export BASE_URL="http://YOUR_TEST_VPS"

2. Run a quick local test (k6 must be installed):
   make run BASE_URL=http://YOUR_TEST_VPS

3. Run k6 with InfluxDB + Grafana (docker-compose):
   make up
   make run-influx BASE_URL=http://YOUR_TEST_VPS
   # Open Grafana at http://localhost:3000 and add InfluxDB datasource:
   # - URL: http://influxdb:8086
   # - Database: k6
   # Import official k6 dashboard (Grafana dashboard ID: 2587) or use a custom one.

CI integration

- `.github/workflows/k6.yml` included will:
  - install k6 on the GitHub runner
  - run k6 with BASE_URL from repository secrets
  - upload JSON results as an artifact

Set the following repository secret before running CI:

- BASE_URL — target base URL (e.g. https://staging.example.com)

Best practices

- Use `scenarios` and `thresholds` in scripts to express load shapes and pass/fail criteria.
- Do not log per-VU data at high loads (console logs slow tests).
- Use SharedArray for large static datasets to avoid per-VU memory bloat.
- For realistic high-volume (DDoS-like) tests, distribute load across multiple machines or use k6 cloud / multiple Kubernetes pods.
- Monitor the target server (CPU, memory, network, disk IO) during runs; integrate metrics into Grafana.
- Keep secrets and credentials out of repository; supply via env variables or CI secrets.
