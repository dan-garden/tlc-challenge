import { DrawConfig, DrawData } from './types';

export const getLatestResults = async (config: DrawConfig) => {

    // Fake delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fetch data from API
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/sales/vmax/web/data/lotto/latestresults`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    });

    // Parse response as JSON
    const data = await response.json() as DrawData;

    // Return data
    return data;
};