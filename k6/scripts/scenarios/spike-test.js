import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '10s', target: 10 },
    { duration: '3m', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.15'],
    errors: ['rate<0.2'],
  },
  tags: {
    test_type: 'spike',
  },
};

export default function () {
  const params = {
    timeout: '45s',
    tags: { scenario: 'spike' },
  };

  const res = http.get(`${BASE_CLIENT_URL}`, params);
  
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'server not crashed': (r) => r.status !== 0,
  });

  errorRate.add(!checkRes);
  
  sleep(0.5);
}