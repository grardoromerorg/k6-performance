import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<200'],
        'group_duration{group:::Main Page}': ['p(95)<8000'],
        'group_duration{group:::News Page}': ['p(95)<6000'],
        'group_duration{group:::Main Page::Assets}': ['p(95)<3000'],

    }
}

export default function () {

    group('Main Page', function () {
        let res = http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=8000ms');
        check(res, {'status is 200': (r) => r.status === 200});

        group('Assets', function () {
            http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=2000ms');
            http.get('https://run.mocky.io/v3/10965f5a-8050-491b-947d-c43e3d62279a?mocky-delay=2000ms');
        })
    });

    group('News Page', function () {
        http.get('https://run.mocky.io/v3/7ad968b8-712c-4aa9-8729-b96c80844985');
    });

    sleep(1);
}