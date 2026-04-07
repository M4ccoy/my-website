import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080';

  const responses = http.batch([
    ['GET', `${baseUrl}/`],
    ['GET', `${baseUrl}/index.html`],
    ['GET', `${baseUrl}/style.css`],
  ]);

  check(responses[0], {
    'home page status is 200': (r) => r.status === 200,
  });

  check(responses[1], {
    'index.html status is 200': (r) => r.status === 200,
  });

  check(responses[2], {
    'style.css status is 200': (r) => r.status === 200,
  });

  sleep(1);
}