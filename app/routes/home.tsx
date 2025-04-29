import type { Route } from './+types/home';
import { createConsent, fetchConsent, updateConsent } from '~/api/fetch-consent';
import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';
import type { Consent } from '~/utils/types';
import { useSubmit, type ActionFunctionArgs } from 'react-router';
import React from 'react';

export function meta({}: Route.MetaArgs) {
    return [
        {
            charset: 'utf-8',
        },
        {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1',
        },
        { title: 'FINT Samtykke' },
        {
            property: 'og:title',
            content: 'FINT Samtykke',
        },
        {
            name: 'description',
            content: 'FINT Samtykke',
        },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const consents = await fetchConsent(request);
    return { consents };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
    const { consents } = loaderData;
    const submit = useSubmit();

    const handleSubmit = (consent: Consent, isActive: boolean) => {
        const formData = new FormData();
        formData.append('processingId', consent.processing.systemId.identifikatorverdi);
        formData.append('consentId', consent.systemIdValue);
        formData.append('isActive', String(isActive));
        if (consent.expirationDate === null) {
            submit(formData, { method: 'post' });
        } else {
            submit(formData, { method: 'put' });
        }
    };
    return (
        <VStack gap={'4'} paddingBlock={'12'}>
            <Heading size="large">Velkommen til FINT Samtykke</Heading>
            <BodyShort> Denne siden gir deg oversikt over dine samtykker</BodyShort>
            <ConsentTable consents={consents} handleSubmit={handleSubmit} />
        </VStack>
    );
};

export default Home;

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const processingId = String(formData.get('processingId'));
    const consentId = String(formData.get('consentId'));
    const isActive = String(formData.get('isActive'));
    if (processingId) {
        if (request.method === 'POST') {
            createConsent(request, processingId);
        } else if (request.method === 'PUT') {
            updateConsent(request, processingId, consentId, isActive);
        }
    }
}

export function ErrorBoundary({ error }: { error: unknown }) {
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                {error instanceof Error ? (
                    <li>
                        <ul>{error.name}</ul>
                        <ul>{error.message}</ul>
                        <ul>{(error as any).data}</ul>
                    </li>
                ) : (
                    <div>Ukjent feil</div>
                )}
            </Alert>
        </Box>
    );
}
