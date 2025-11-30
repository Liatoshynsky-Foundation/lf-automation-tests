include .env
export

.PHONY: help start stop restart logs status clean run-smoke run-load run-stress run-spike view-grafana

help:
	@echo "K6 Performance Testing Commands"
	@echo "================================"
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
	@echo "Monitoring:"
	@echo "  make view-grafana   - Open Grafana dashboard"
	@echo "  make view-influx    - Open InfluxDB"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean          - Remove old results"
	@echo "  make clean-all      - Remove all data and volumes"

start:
	@echo "Starting monitoring stack..."
	@mkdir -p grafana/provisioning/datasources grafana/provisioning/dashboards grafana/dashboards
	@docker-compose up -d
	@echo "✓ Grafana: http://localhost:3001 (admin/admin123)"
	@echo "✓ InfluxDB: http://localhost:8086 (admin/admin123)"

stop:
	@docker-compose down

restart:
	@docker-compose restart

logs:
	@docker-compose logs -f

status:
	@docker-compose ps

run-smoke:
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh smoke

run-load:
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh load

run-stress:
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh stress

run-spike:
	@chmod +x scripts/run-scenario.sh
	@./scripts/run-scenario.sh spike

run-qa:
	@chmod +x run-test.sh
	@./run-test.sh

run-qa-monitoring:
	@chmod +x scripts/run-with-monitoring.sh
	@./scripts/run-with-monitoring.sh qa-client-stage

view-grafana:
	@open http://localhost:3001

view-influx:
	@open http://localhost:8086

clean:
	@find results -type f -name "*.json" -mtime +7 -delete
	@find results -type f -name "*.html" -mtime +7 -delete
	@echo "✓ Old results cleaned"

clean-all:
	@docker-compose down -v
	@rm -rf results/*
	@echo "✓ All data cleaned"