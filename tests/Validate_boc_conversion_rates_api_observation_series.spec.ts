import { test, expect, request } from '@playwright/test';
import { getApiResponseForObservationBySeriesForRecentWeeks } from '../utilities/BankOfCanadaAPI';

test('Validate observations by series api', async ({ page }) => {
    const numberOfWeeks = 10;
    const seriesNames = ['FXCADUSD', 'FXUSDCAD', 'FXAUDCAD', 'FXBRLCAD'];

    await test.step('Validate observations api for valid series names', async () => {

        for (const seriesName of seriesNames) {
            const data = await getApiResponseForObservationBySeriesForRecentWeeks(page, seriesName, numberOfWeeks);
            const observations = JSON.stringify(data.observations);
            console.log('Response is : ' + observations);
            expect(observations.length).toBeGreaterThan(0);
            expect(observations.hasOwnProperty('d'));
            expect(observations.hasOwnProperty('v'));
            expect(data.observations[0].d).toContain('2024');
            let firstDateValueInResponse = data.observations[0].d
            firstDateValueInResponse = new Date(firstDateValueInResponse);
            // Get the current date
            let currentDate = new Date();
            // Compare the dates and validate if response is for dates prior to current date
            let dateCompare = currentDate > firstDateValueInResponse;
            expect (dateCompare).toBe(true);
        }
    })

    await test.step('Validate response for invalid series names,', async () => {

        const data = await getApiResponseForObservationBySeriesForRecentWeeks(page, 'FXUSY', numberOfWeeks);
        console.log(data);
        expect(data.message).toContain('Series FXUSY not found');

    })

    await test.step('Validate response for invalid number of weeks,', async () => {

        const data = await getApiResponseForObservationBySeriesForRecentWeeks(page, 'FXUSY', 0);
        console.log(data);
        expect(data.message).toContain('Bad recent observations request parameters, you cannot have a recent value less than one');

    })
})