import { test, expect, request } from '@playwright/test';

test('Validate observations by series api', async ({request}) => {

    await test.step('Validate conversion for CAD to USD', async () => {
        const response = await request.get('https://www.bankofcanada.ca/valet/observations/FXCADUSD/json?recent_weeks=10');
        const data = await response.json();
        const respObservations =  JSON.stringify(data.observations);
        console.log('Response is : ' + respObservations);
        expect(data).toHaveProperty('observations');
        expect(data.observations.length).toBeGreaterThan(0);
    });
})