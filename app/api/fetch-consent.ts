// @ts-ignore
import { BASE_PATH, CONSENT_API_URL } from '../../environment.js';
import type { Consent } from '~/utils/types';
import { fetchData, handleResponse, sendRequest } from '~/api/utils';
import logger from '~/api/logger';

export const fetchConsent = async (request: Request): Promise<Consent[]> => {
    console.log('fetchConsent');
    try {
        return fetchData(
            `${CONSENT_API_URL}${BASE_PATH}/consents`,
            request,
            'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
        );
    } catch (error) {
        logger.error('Error in fetchConsent:', error);
        throw error;
    }
};

export const createConsent = async (request: Request, processingId: string): Promise<Consent> => {
    console.log('createConsent');
    try {
        const response = await sendRequest({
            url: `${CONSENT_API_URL}${BASE_PATH}/consents/${processingId}`,
            method: 'POST',
            token: request.headers.get('Authorization'),
        });

        return handleResponse(response, 'Kunne ikke opprette samtykke');
    } catch (error) {
        logger.error('Error in createConsent:', error);
        throw error;
    }
};

export const updateConsent = async (
    request: Request,
    processingId: string,
    consentId: string,
    isActive: string
): Promise<Consent> => {
    console.log('updateConsent');
    try {
        const response = await sendRequest({
            url: `${CONSENT_API_URL}${BASE_PATH}/consents/${consentId}/${processingId}/${isActive}`,
            method: 'PUT',
            token: request.headers.get('Authorization'),
        });

        return handleResponse(response, 'Kunne ikke oppdatere samtykke');
    } catch (error) {
        logger.error('Error in updateConsent:', error);
        throw error;
    }
};
