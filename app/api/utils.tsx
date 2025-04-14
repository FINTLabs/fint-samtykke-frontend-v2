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
