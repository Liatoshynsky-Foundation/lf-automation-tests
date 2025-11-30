import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Counter, Trend } from 'k6/metrics';

const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

const errorRate = new Rate('errors');
const successCounter = new Counter('success_requests');
const failureCounter = new Counter('failed_requests');
const pageLoadTime = new Trend('page_load_time');

export const options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '2m', target: 20 },
    { duration: '5m', target: 20 },
    { duration: '2m', target: 30 },
    { duration: '5m', target: 30 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.1'],
    'page_load_time': ['p(95)<3000'],
  },
  tags: {
    test_type: 'load',
  },
};

export default function () {
  const params = {
    timeout: '30s',
    tags: { scenario: 'load' },
  };

  group('Homepage Load', function () {
    const res = http.get(`${BASE_CLIENT_URL}`, params);
    
    const checkRes = check(res, {
      'status is 200': (r) => r.status === 200,
      'status is not 500': (r) => r.status !== 500,
      'response time < 3s': (r) => r.timings.duration < 3000,
      'has content': (r) => r.body.length > 0,
    });

    if (checkRes) {
      successCounter.add(1);
    } else {
      failureCounter.add(1);
    }

    errorRate.add(!checkRes);
    pageLoadTime.add(res.timings.duration);
  });
  
  sleep(1);
}