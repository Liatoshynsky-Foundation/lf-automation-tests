import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_ADMIN_URL = __ENV.BASE_ADMIN_URL || 'http://localhost:3000';
const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  const params = {
    timeout: '30s',
    tags: { name: 'HomePage' },
  };

  const res = http.get(`${BASE_CLIENT_URL}`, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'status is not 500': (r) => r.status !== 500,
    'response time < 10s': (r) => r.timings.duration < 10000,
    'has content': (r) => r.body.length > 0,
  });
  
  sleep(1);
}

export function handleSummary(data) {
  return {
    "stdout": htmlReport(data),
  };
}