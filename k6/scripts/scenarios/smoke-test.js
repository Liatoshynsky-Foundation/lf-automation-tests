import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

const errorRate = new Rate('errors');
const customTrend = new Trend('custom_response_time');

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    errors: ['rate<0.1'],
  },
  tags: {
    test_type: 'smoke',
  },
};

export default function () {
  const params = {
    timeout: '30s',
    tags: { scenario: 'smoke' },
  };

  const res = http.get(`${BASE_CLIENT_URL}`, params);
  
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(!checkRes);
  customTrend.add(res.timings.duration);
  
  sleep(1);
}