import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_ADMIN_URL = __ENV.BASE_ADMIN_URL || 'http://localhost:3000';

export const options = {
  vus: 10, // virtual users
  duration: '30s',
};

export default function () {
  const res = http.get(`${BASE_ADMIN_URL}`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}