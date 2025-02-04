import { test, expect, request } from '@playwright/test';
import { getApiResponseForObservationBySeriesForRecentWeeks , validateApiResponse } from '../utilities/BankOfCanadaAPI';

test('Validate observations by series api', async ({ page }) => {
    const numberOfWeeks = 10;
    const seriesNames = ['FXCADUSD', 'FXUSDCAD', 'FXAUDCAD', 'FXBRLCAD'];

    await test.step('Validate observations api for valid series names', async () => {

        for (const seriesName of seriesNames) {
            const data = await getApiResponseForObservationBySeriesForRecentWeeks(page, seriesName, numberOfWeeks);
            const observations = JSON.stringify(data.observations);
            console.log('Response is : ' + observations);
            expect(observations.length).toBeGreaterThan(0);
        }
    })

    await test.step('Validate response for invalid series names,' , async () => {
     
        const data = await getApiResponseForObservationBySeriesForRecentWeeks(page, 'FXUSY' , numberOfWeeks);
        console.log(data);
        await validateApiResponse(data,'FXUSY');

    })
})