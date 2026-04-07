import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 30 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080';

  const res = http.get(`${baseUrl}/`);

  check(res, {
    'main page status is 200': (r) => r.status === 200,
  });

  sleep(1);
}