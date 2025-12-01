# K6 Performance Testing Suite

Complete performance testing setup with real-time dashboards, Grafana visualization, and InfluxDB storage for the LF Automation Tests project.

## Features

- ✅ Multiple test scenarios (smoke, load, stress, spike)
- ✅ Real-time k6 web dashboard during test execution
- ✅ Grafana + InfluxDB for historical metrics and analysis
- ✅ Automated provisioning and configuration
- ✅ Docker-based monitoring stack
- ✅ Make commands for easy execution
- ✅ HTML and JSON result exports
- ✅ Environment-based configuration

## Quick Start

### Prerequisites

```bash
# Install k6
brew install k6

# Install Docker (using Colima for lightweight setup)
brew install colima
colima start

# Install xk6 for dashboard extension
go install go.k6.io/xk6/cmd/xk6@latest

# Build k6 with dashboard extension
cd /tmp
xk6 build --with github.com/grafana/xk6-dashboard@latest
sudo mv k6 /usr/local/bin/k6
```

## Setup

### 1. Configure Environment

```bash
cd k6
cp .env.example .env
```

Edit `.env` with your target URLs:

```bash
BASE_CLIENT_URL=https://your-app.com
BASE_ADMIN_URL=https://your-admin.com
```

### 2. Start Monitoring Stack

```bash
make start
```

This will:

- Start InfluxDB on port 8086
- Start Grafana on port 3001
- Auto-configure InfluxDB data source
- Create results directory

Access:

- Grafana: http://localhost:3001 (log/pass)
- InfluxDB: http://localhost:8086 (log/pass)

### 3. Import Grafana Dashboard

```bash
# Open Grafana
make view-grafana

# In Grafana:
# 1. Click "+" → "Import"
# 2. Enter dashboard ID: 2587
# 3. Select "InfluxDB" as data source
# 4. Click "Import"
```

Alternative dashboard IDs:

- **2587** - K6 Load Testing Results (recommended)
- **19665** - K6 Prometheus (detailed)
- **18030** - K6 Test Result (simple)
- **10660** - K6 InfluxDB Live (real-time)

## Test Scenarios

### Smoke Test

**Purpose**: Quick validation that system works under minimal load

```bash
make run-smoke
```

- **Duration**: 1 minute
- **VUs**: 1
- **Use Case**: Verify basic functionality before heavier testing
- **Thresholds**: p(95) < 500ms, errors < 10%

### Load Test

**Purpose**: Test system under normal expected load

```bash
make run-load
```

- **Duration**: 23 minutes
- **VUs**: Ramps from 10 → 20 → 30
- **Use Case**: Verify system handles expected traffic
- **Thresholds**: p(95) < 2s, errors < 5%

### Stress Test

**Purpose**: Find system breaking point

```bash
make run-stress
```

- **Duration**: 32 minutes
- **VUs**: Ramps up to 200
- **Use Case**: Identify system limits and failure modes
- **Thresholds**: p(95) < 5s, errors < 20%

### Spike Test

**Purpose**: Test recovery from sudden traffic bursts

```bash
make run-spike
```

- **Duration**: 8 minutes
- **VUs**: Quick spike from 10 → 100 → 10
- **Use Case**: Verify auto-scaling and recovery
- **Thresholds**: p(95) < 5s, errors < 15%

### QA Staging Test

**Purpose**: Custom test against QA environment

```bash
make run-qa
```

- **Duration**: 3.5 minutes
- **VUs**: Ramps from 5 → 10
- **Use Case**: Regular QA environment validation

## Running Tests

### With Live Dashboard (Recommended for Development)

```bash
# Smoke test with live dashboard
make run-smoke-dash

# Load test with live dashboard
make run-load-dash
```

Live dashboard will open at: http://localhost:5665

### With Monitoring Stack (Recommended for Analysis)

```bash
# 1. Start monitoring
make start

# 2. Run test
make run-smoke

# 3. View results in Grafana
make view-grafana
```

### Combined (Dashboard + Grafana)

```bash
# Start monitoring
make start

# Run with both outputs
k6 run \
  --out web-dashboard \
  --out influxdb=http://admin:admin123@localhost:8086/k6 \
  scripts/scenarios/smoke-test.js
```

### Direct k6 Commands

```bash
# Simple run
k6 run scripts/scenarios/smoke-test.js

# With environment variables
k6 run -e BASE_CLIENT_URL=https://staging.example.com scripts/scenarios/load-test.js

# Custom VUs and duration
k6 run --vus 50 --duration 2m scripts/qa-client-stage.js

# With multiple outputs
k6 run \
  --out json=results/test.json \
  --out influxdb=http://admin:admin123@localhost:8086/k6 \
  scripts/scenarios/stress-test.js
```

## Available Commands

### Infrastructure

```bash
make start          # Start monitoring stack (Grafana + InfluxDB)
make stop           # Stop monitoring stack
make restart        # Restart monitoring stack
make logs           # View container logs
make status         # Check container status
```

### Test Execution

```bash
make run-smoke      # Run smoke test (1 VU, 1 min)
make run-load       # Run load test (10-30 VUs, 23 min)
make run-stress     # Run stress test (10-200 VUs, 32 min)
make run-spike      # Run spike test (10-100 VUs, 8 min)
make run-qa         # Run QA staging test
```

### Live Dashboard Tests

```bash
make run-smoke-dash # Run smoke test with live dashboard
make run-load-dash  # Run load test with live dashboard
```

### Monitoring

```bash
make view-grafana   # Open Grafana dashboard (http://localhost:3001)
make view-influx    # Open InfluxDB (http://localhost:8086)
make view-dashboard # Open k6 live dashboard (http://localhost:5665)
```

### Maintenance

```bash
make clean          # Remove results older than 7 days
make clean-all      # Remove all data and volumes
make help           # Show all available commands
```

## Understanding Metrics

### HTTP Metrics

- **http_req_duration**: Total request time (connection + sending + waiting + receiving)
- **http_req_waiting**: Time to first byte (TTFB) - server processing time
- **http_req_connecting**: TCP connection establishment time
- **http_req_tls_handshaking**: TLS/SSL handshake time
- **http_req_sending**: Time spent sending request data
- **http_req_receiving**: Time spent receiving response data
- **http_req_blocked**: Time blocked before initiating request
- **http_req_failed**: Percentage of failed requests (non-2xx/3xx responses)
- **http_reqs**: Total number of HTTP requests made

### Iteration Metrics

- **iteration_duration**: Time to complete one full iteration
- **iterations**: Total number of iterations completed
- **vus**: Current number of active virtual users
- **vus_max**: Maximum number of virtual users allocated

### Data Transfer Metrics

- **data_received**: Total bytes received from server
- **data_sent**: Total bytes sent to server

### Custom Metrics

- **errors**: Custom error rate from checks
- **success_requests**: Counter of successful requests
- **failed_requests**: Counter of failed requests
- **page_load_time**: Custom page load timing

### Percentiles Explained

- **p(50)** or **median**: 50% of requests faster than this
- **p(90)**: 90% of requests faster than this
- **p(95)**: 95% of requests faster than this (common SLA)
- **p(99)**: 99% of requests faster than this (tail latency)

### Thresholds

Thresholds define pass/fail criteria:

```javascript
thresholds: {
  http_req_duration: ['p(95)<2000'],  // 95% under 2s
  http_req_failed: ['rate<0.05'],      // Less than 5% failures
  checks: ['rate>0.95'],               // 95% of checks pass
}
```

## Directory Structure

```
k6/
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example configuration
├── .gitignore                     # Git ignore rules
├── docker-compose.yml             # Monitoring stack definition
├── Makefile                       # Command shortcuts
├── README.k6.md                   # This file
├── run-test.sh                    # Main test runner
│
├── grafana/
│   ├── dashboards/                # Custom dashboard JSON files
│   └── provisioning/
│       ├── datasources/
│       │   └── datasource.yml    # Auto-configure InfluxDB
│       └── dashboards/
│           └── dashboard.yml     # Auto-import dashboards
│
├── results/                       # Test results (JSON/HTML)
│   ├── smoke_TIMESTAMP.json
│   ├── smoke_summary_TIMESTAMP.json
│   └── report_TIMESTAMP.html
│
└── scripts/
    ├── qa-client-stage.js         # QA staging test
    ├── run-scenario.sh            # Scenario runner script
    ├── run-with-monitoring.sh     # Test with monitoring
    │
    └── scenarios/
        ├── smoke-test.js          # Smoke test scenario
        ├── load-test.js           # Load test scenario
        ├── stress-test.js         # Stress test scenario
        └── spike-test.js          # Spike test scenario
```

## Troubleshooting

### Docker Issues

**Problem**: `Cannot connect to Docker daemon`

```bash
# Start Colima
colima start

# Verify Docker is running
docker ps
```

**Problem**: `Port already in use`

```bash
# Check what's using the port
lsof -i :3001
lsof -i :8086

# Stop conflicting services or change ports in docker-compose.yml
```

### InfluxDB Issues

**Problem**: `Couldn't write stats - user is required`

**Solution**: Ensure k6 command includes credentials:

```bash
k6 run --out influxdb=http://admin:admin123@localhost:8086/k6 script.js
```

**Problem**: `Database not found`

```bash
# Recreate InfluxDB
make stop
make clean-all
make start
```

### Grafana Issues

**Problem**: `No data in Grafana dashboard`

**Solution**:

1. Verify InfluxDB data source is configured
2. Check database name is `k6`
3. Ensure tests are running with InfluxDB output
4. Verify time range in Grafana matches test execution time

**Problem**: `Dashboard import fails`

**Solution**:

1. Manually create data source first
2. Try alternative dashboard IDs (2587, 19665, 18030)
3. Check InfluxDB version compatibility (use 1.8)

### Performance Issues

**Problem**: `Tests are slow to start`

```bash
# Reduce VUs or duration for testing
k6 run --vus 5 --duration 30s script.js
```

**Problem**: `Target server errors (500, 503)`

**Solution**:

- Server is overloaded - reduce VUs
- Check server logs and resources
- Increase thresholds to match reality
- Test against more powerful environment

### k6 Extension Issues

**Problem**: `xk6-dashboard not working`

```bash
# Rebuild k6 with extension
cd /tmp
xk6 build --with github.com/grafana/xk6-dashboard@latest
sudo mv k6 /usr/local/bin/k6

# Verify
k6 version
```

## Best Practices

### Before Testing

1. **Get Authorization**: Only test systems you own or have permission to test
2. **Start Small**: Begin with smoke tests before load tests
3. **Set Realistic Thresholds**: Base on actual performance requirements
4. **Monitor Target System**: Watch CPU, memory, network during tests
5. **Use Staging Environment**: Never run stress tests on production

### During Testing

1. **Watch Live Metrics**: Use dashboard or Grafana for real-time feedback
2. **Monitor Both Sides**: Watch k6 metrics AND target server metrics
3. **Document Findings**: Note any anomalies or bottlenecks
4. **Isolate Variables**: Test one change at a time
5. **Save Results**: Keep historical data for comparison

### After Testing

1. **Analyze Results**: Review all metrics, not just response times
2. **Compare Baselines**: Track performance over time
3. **Share Reports**: Export and share results with team
4. **Action Items**: Create tickets for identified issues
5. **Clean Up**: Remove old test results regularly

### Script Development

1. **Use Scenarios**: Define load profiles clearly
2. **Set Thresholds**: Define pass/fail criteria
3. **Tag Requests**: Use tags for filtering and grouping
4. **Custom Metrics**: Track business-specific metrics
5. **Reusable Code**: Create helper functions for common tasks

### CI/CD Integration

```yaml
# Example GitHub Actions
- name: Run k6 Performance Test
  run: |
    cd k6
    make start
    make run-smoke
    make stop
  env:
    BASE_CLIENT_URL: ${{ secrets.STAGING_URL }}
```
