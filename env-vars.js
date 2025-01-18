import http from 'k6/http';

export default function () {
    http.get(`${__ENV.BASE_URL}/crocodiles`);
}

// command = k6 run -e BASE_URL=https://test-api.k6.io/public env-vars.js