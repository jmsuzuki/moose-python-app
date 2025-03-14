import http from 'k6/http';
import {sleep} from 'k6';


// Simple function to generate a pseudo-unique ID
function generateUniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const options = {
    vus: 100,
    duration: '900s',
    iterations: 1000000,
    cloud: {
        // Project: mitchell
        projectID: 3743662,
        // Test runs with the same name groups test runs together.
        name: `Test Moose - 0.3.763`
    }
};

export default function () {
    let base_url = "https://514-mitchell-moose-p-main-53993e.boreal.cloud"
    // let base_url = "https://514-moose-python-app-main-d04370.boreal.cloud"
    base_url += "/ingest/UserActivity"

    // Get current date and format it
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').split('.')[0];

    const payload = {
        "eventId": generateUniqueId(),
        "timestamp": timestamp,
        "userId": "123456",
        "activity": "k6 tests"
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
