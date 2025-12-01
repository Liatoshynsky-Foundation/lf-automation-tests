include .env
export

.PHONY: help validate start stop restart logs status clean run-smoke run-load run-stress run-spike view-grafana

help:
	@echo "K6 Performance Testing Commands"
	@echo "================================"
	@echo "Setup:"
	@echo "  make validate       - Validate .env configuration"
	@echo ""
	@echo "Infrastructure:"
	@echo "  make start          - Start monitoring stack (Grafana + InfluxDB)"
	@echo "  make stop           - Stop monitoring stack"
	@echo "  make restart        - Restart monitoring stack"
	@echo "  make logs           - View container logs"
	@echo "  make status         - Check container status"
	@echo ""
	@echo "Test Scenarios:"
	@echo "  make run-smoke      - Run smoke test (1 VU, 1 min)"
	@echo "  make run-load       - Run load test (10-30 VUs, 23 min)"
	@echo "  make run-stress     - Run stress test (10-200 VUs, 32 min)"
	@echo "  make run-spike      - Run spike test (10-100 VUs, 8 min)"
	@echo "  make run-qa         - Run QA staging test"
	@echo ""
	@echo "Test with Dashboard:"
	@echo "  make run-smoke-dash - Run smoke test with live dashboard"
	@echo "  make run-load-dash  - Run load test with live dashboard"
	@echo ""
	@echo "Monitoring:"
	@echo "  make view-grafana   - Open Grafana dashboard"
	@echo "  make view-influx    - Open InfluxDB"
	@echo "  make view-dashboard - Open k6 live dashboard"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean          - Remove old results"
	@echo "  make clean-all      - Remove all data and volumes"

validate:
	@chmod +x scripts/validate-env.sh
	@./scripts/validate-env.sh

start: validate
	@echo "Starting monitoring stack..."
	@mkdir -p grafana/provisioning/datasources grafana/provisioning/dashboards grafana/dashboards
	@docker-compose up -d
	@echo "✓ Grafana: http://localhost:${GRAFANA_PORT} (${GRAFANA_USER}/${GRAFANA_PASSWORD})"
	@echo "✓ InfluxDB: http://localhost:${INFLUXDB_PORT} (${INFLUXDB_USER}/${INFLUXDB_PASSWORD})"

stop:
	@docker-compose down

restart:
	@docker-compose restart

logs:
	@docker-compose logs -f

status:
	@docker-compose ps

run-smoke: validate
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh smoke

run-load: validate
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh load

run-stress: validate
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh stress

run-spike: validate
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh spike

run-smoke-dash: validate
	@echo "Starting smoke test with live dashboard..."
	@echo "Dashboard: http://localhost:5665"
	@k6 run --out web-dashboard scripts/scenarios/smoke-test.js

run-load-dash: validate
	@echo "Starting load test with live dashboard..."
	@echo "Dashboard: http://localhost:5665"
	@k6 run --out web-dashboard scripts/scenarios/load-test.js

run-qa: validate
	@chmod +x run-test.sh
	@./run-test.sh

run-qa-monitoring:
	@chmod +x scripts/run-with-monitoring.sh
	@./scripts/run-with-monitoring.sh qa-client-stage

view-grafana:
	@open http://localhost:${GRAFANA_PORT}

view-influx:
	@open http://localhost:${INFLUXDB_PORT}

view-dashboard:
	@open http://localhost:5665

clean:
	@find results -type f -name "*.json" -mtime +7 -delete
	@find results -type f -name "*.html" -mtime +7 -delete
	@echo "✓ Old results cleaned"

clean-all:
	@docker-compose down -v
	@rm -rf results/*
	@echo "✓ All data cleaned"