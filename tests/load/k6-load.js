import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 10,
    // duration: '30s',
    iterations: 4000,
    cloud: {
        // Project: mitchell
        projectID: 3743662,
        // Test runs with the same name groups test runs together.
        name: 'Test (29/01/2025-15:49:40)'
    }
};

export default function () {
    const base_url = "https://mitchell-test-moose-python-app-main-eb82f6.boreal.cloud/ingest/UserActivity"

    const payload = {
        "eventId": "1",
        "timestamp": "2019-01-01 00:00:01",
        "userId": "123456",
        "activity": "click"
    }

    while (true) {
        try {
            const response = http.post(base_url, JSON.stringify(payload), {headers: {"Content-Type": "application/json"}});
            if (response.status < 400) {
                break; // Success! Exit the retry loop
            }
        } catch (error) {
            console.log(`Request failed with error: ${error}. Retrying...`);
        }
    }
}
