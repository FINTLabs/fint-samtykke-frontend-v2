// @ts-ignore
import { BASE_PATH, CONSENT_API_URL } from '../../environment.js';
import type { Consent } from '~/utils/types';
import { fetchData, handleResponse, sendRequest } from '~/api/utils';
import logger from '~/api/logger';

export const fetchConsent = async (request: Request): Promise<Consent[]> => {
    //TODO: remove this
    logger.info('fetchConsent', `${CONSENT_API_URL}${BASE_PATH}/consents`);
    return fetchData(
        `${CONSENT_API_URL}${BASE_PATH}/consents`,
        request,
        'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
    );
};

export const createConsent = async (reqest: Request, processingId: string): Promise<Consent> => {
    //TODO: remove this
    logger.info('createConsent', `${CONSENT_API_URL}${BASE_PATH}/consents/${processingId}`);
    const response = await sendRequest({
        url: `${CONSENT_API_URL}${BASE_PATH}/consents/${processingId}`,
        method: 'POST',
        token: reqest.headers.get('Authorization'),
    });

    return handleResponse(response, 'Kunne ikke opprette samtykke');
};

export const updateConsent = async (
    reqest: Request,
    processingId: string,
    consentId: string,
    isActive: string
): Promise<Consent> => {
    //TODO: remove this
    logger.info(
        'updateConsent',
        `${CONSENT_API_URL}${BASE_PATH}/consents/${consentId}/${processingId}/${isActive}`
    );
    const response = await sendRequest({
        url: `${CONSENT_API_URL}${BASE_PATH}/consents/${consentId}/${processingId}/${isActive}`,
        method: 'PUT',
        token: reqest.headers.get('Authorization'),
    });

    return handleResponse(response, 'Kunne ikke oppdatere samtykke');
};
