import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles');
    const crocodile = res.json()
    const crocodile_id = crocodile[0].id
    const crocodile_name = crocodile[0].name
    console.log(res.headers['Content-Type'])
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodile_id}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === crocodile_name,
    })
}

// run k6 run --http-debug=full http-get.js