# Makefile helper for k6 local work
K6_SCRIPT ?= ./k6/scripts/stress-test.js
BASE_URL ?= http://localhost:3000
DC_FILE ?= k6/docker-compose.yml

.PHONY: run run-influx up down grafana

# Run using local k6 binary
run:
	BASE_URL=$(BASE_URL) k6 run $(K6_SCRIPT)

# Run and push results to local InfluxDB (docker-compose must be up)
run-influx:
	BASE_URL=$(BASE_URL) k6 run --out influxdb=http://localhost:8086/k6 $(K6_SCRIPT)

# Start local stack (InfluxDB + Grafana)
up:
	docker-compose -f $(DC_FILE) up -d --build

# Stop local stack
down:
	docker-compose -f $(DC_FILE) down -v

# Info how to open grafana
grafana:
	@echo "Grafana: http://localhost:3000"
	@echo "InfluxDB: http://localhost:8086 (DB: k6)"