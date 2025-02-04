import {  Page, expect, request } from '@playwright/test';


   export async function getApiResponseForObservationBySeriesForRecentWeeks( page: Page,  seriesNames: string, numberOfWeeks) {
        const response = await page.request.get(`https://www.bankofcanada.ca/valet/observations/${seriesNames}/json?recent_weeks=${numberOfWeeks}`);
        if (!response.ok()) {
            throw new Error(`API request failed with status: ${response.status()}`);
        }
        const data = await response.json();
        const respObservations =  JSON.stringify(data.observations);
        console.log('API response for series: '+ seriesNames);
        console.log('Response is : ' + respObservations);
        return respObservations;
    }
