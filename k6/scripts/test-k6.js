import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_ADMIN_URL = __ENV.BASE_ADMIN_URL || 'http://localhost:3001';
const BASE_CLIENT_URL = __ENV.BASE_CLIENT_URL || 'http://localhost:3000';

export const options = {
  vus: 100, // virtual users
  duration: '60s',
};

export default function () {
  const res = http.get(`${BASE_CLIENT_URL}`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}