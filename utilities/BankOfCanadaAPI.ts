import {  Page, expect, request } from '@playwright/test';


   export async function getApiResponseForObservationBySeriesForRecentWeeks( page: Page,  seriesNames: string, numberOfWeeks) {
        const response = await page.request.get(`https://www.bankofcanada.ca/valet/observations/${seriesNames}/json?recent_weeks=${numberOfWeeks}`);
        const data = await response.json();
        console.log('API response for series: '+ seriesNames);
        return data;
    }
