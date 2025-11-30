import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '5m', target: 200 },
    { duration: '10m', target: 200 },
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.2'],
    errors: ['rate<0.3'],
  },
  tags: {
    test_type: 'stress',
  },
};

export default function () {
  const params = {
    timeout: '60s',
    tags: { scenario: 'stress' },
  };

  const res = http.get(`${BASE_CLIENT_URL}`, params);
  
  const checkRes = check(res, {
    'status is not 500': (r) => r.status !== 500,
    'response received': (r) => r.status !== 0,
  });

  errorRate.add(!checkRes);
  
  sleep(1);
}