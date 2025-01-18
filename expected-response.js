import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'http_req_duration{expected_response:true}': ['p(95)<2000']
    }
}

export default function () {

    group('Main Page', function () {
        const res = http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=900ms');
        check(res, {'status is 200': (r) => r.status === 200});

        group('Assets', function () {
            http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=900ms');
        })
    });

    group('News Page', function () {
        const res = http.get('https://run.mocky.io/v3/7ad968b8-712c-4aa9-8729-b96c80844985');
        check(res, {'status is 503': (r) => r.status === 503});
    });

    sleep(1);
}