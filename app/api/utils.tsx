import logger from '~/api/logger';

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
        return handleResponse(response, defaultErrorMessage);
    } catch (error) {
        const statusText =
            error instanceof Response
                ? error.statusText
                : error instanceof Error
                  ? error.message
                  : 'Ukjent feil';
        logger.info('Error fetching data:', url, error, statusText);
        throw new Error(
            `Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen. (${statusText})`
        );
    }
};

export const handleResponse = async (response: Response, errorMessage: string): Promise<any> => {
    if (response.ok) return response.json();
    if (response.status === 403) {
        logger.info('403 Forbidden:', response.statusText);
        throw new Error(
            'Det ser ut som om du mangler rettigheter til den dataen du prøver å hente.'
        );
    }
    if (response.status === 401) {
        logger.info('401 Unauthorized:', response.statusText);

        throw new Error('Påloggingen din er utløpt, vennligst logg inn på nytt.');
    }
    logger.info('Error response:', response.status, response.statusText);

    throw new Error(`${response.status} - ${response.statusText}`);
};

export const sendRequest = async ({
    url,
    method,
    token,
    body,
    stringifiedBody,
}: {
    url: string;
    method: string;
    token: string | null;
    body?: object;
    stringifiedBody?: string;
}) => {
    try {
        logger.info(
            `${method} request to url:`,
            url,
            body ? `with body ${JSON.stringify(body)}` : ''
        );
        return await fetch(url, {
            headers: {
                Authorization: token ?? '',
                'content-type': 'application/json',
            },
            method,
            body: stringifiedBody ?? JSON.stringify(body ?? {}),
        });
    } catch (error) {
        logger.error('Error sending request:', error);
        throw new Error('Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.');
    }
};
