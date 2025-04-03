// @ts-ignore
import { API_BASE_PATH, CONSENT_API_URL } from '../../environment.js';
import logger from '~/api/logger';
import type { Consent } from '~/utils/types';

export const fetchData = async (
    url: string,
    request: Request,
    defaultErrorMessage = 'En feil oppstod under henting av data'
) => {
    try {
        logger.info(`GET request to url:`, url);
        const response = await fetch(url, {
            headers: {
                ...request.headers,
                Authorization: `Bearer ${request.headers.get('Authorization')}`,
            },
        });
        console.log('response', response);
        return handleResponse(response, defaultErrorMessage);
    } catch (error) {
        throw new Error('Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.');
    }
};

export const handleResponse = async (response: Response, errorMessage: string) => {
    if (response.ok) return response.json();
    if (response.status === 403)
        throw new Error(
            'Det ser ut som om du mangler rettigheter til den dataen du prøver å hente.'
        );
    if (response.status === 401)
        throw new Error('Påloggingen din er utløpt, vennligst logg inn på nytt.');
    throw new Error(`${response.status} - ${response.statusText}`);
};

export const fetchConsent = async (request: Request): Promise<Consent[]> => {
    console.log('fetchConsent', `${CONSENT_API_URL}/api/consents`);
    return fetchData(
        `${CONSENT_API_URL}/api/consents`,
        request,
        'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
    );
};
