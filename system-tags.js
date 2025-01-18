import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/2083dcf2-a8e8-44da-b013-b409ee8c3990');
    http.get('https://run.mocky.io/v3/61d62c4e-d3b1-4a64-8aa7-197a52d6bd6c?mocky-delay=2000ms');
}