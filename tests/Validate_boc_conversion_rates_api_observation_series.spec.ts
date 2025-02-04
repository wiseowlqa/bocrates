import { test, expect, request } from '@playwright/test';
import { getApiResponseForObservationBySeriesForRecentWeeks } from '../utilities/BankOfCanadaAPI';

test('Validate observations by series api', async ({ page }) => {
    const numberOfWeeks = 10;
    const seriesNames = ['FXCADUSD', 'FXUSDCAD', 'FXAUDUSD', 'FXUSDAUD'];

    await test.step('Validate observations api for valid series names', async () => {

        for (const seriesName of seriesNames) {
            /*  const response = await request.get('https://www.bankofcanada.ca/valet/observations/FXCADUSD/json?recent_weeks=10');
              const data = await response.json();
              const respObservations =  JSON.stringify(data.observations);
              console.log('Response is : ' + respObservations);
              expect(data).toHaveProperty('observations'); */
            const observations = await getApiResponseForObservationBySeriesForRecentWeeks(page, seriesName, numberOfWeeks);
            expect(observations.length).toBeGreaterThan(0);
        }
    })
})