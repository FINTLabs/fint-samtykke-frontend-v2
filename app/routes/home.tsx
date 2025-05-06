import type { Route } from './+types/home';
import { createConsent, fetchConsent, updateConsent } from '~/api/fetch-consent';
import { Alert, BodyShort, Box, Heading, Hide, HStack, Show, VStack } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';
import type { Consent } from '~/utils/types';
import { useSubmit, type ActionFunctionArgs, useRouteError } from 'react-router';
import React from 'react';
import { ConsentList } from '~/components/ConsentList';

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
    try {
        const consents = await fetchConsent(request);
        return { consents };
    } catch (error) {
        throw new Response(
            error instanceof Error
                ? error.message
                : 'En ukjent feil oppstod ved henting av samtykker.',
            {
                status: 500,
            }
        );
    }
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
            <BodyShort>
                Denne siden gir deg oversikt over dine samtykker. Du kan gi og trekke tilbake
                samtykker her.
            </BodyShort>
            <Hide below="md">
                <ConsentTable consents={consents} handleSubmit={handleSubmit} />
            </Hide>
            <Show below="md">
                <ConsentList consents={consents} handleSubmit={handleSubmit} />
            </Show>
        </VStack>
    );
};

export default Home;

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const processingId = String(formData.get('processingId'));
        const consentId = String(formData.get('consentId'));
        const isActive = String(formData.get('isActive'));
        if (processingId) {
            if (request.method === 'POST') {
                await createConsent(request, processingId);
            } else if (request.method === 'PUT') {
                await updateConsent(request, processingId, consentId, isActive);
            }
        }
    } catch (error) {
        throw new Response(
            error instanceof Error
                ? error.message
                : `En ukjent feil oppstod ved ${request.method === 'POST' ? 'oppretting' : 'endring'} av samtykke.`,
            {
                status: 500,
            }
        );
    }
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                {!!error ? (
                    <HStack gap="4">
                        <div>{(error as any).data}</div>
                        <div>{error.message}</div>
                    </HStack>
                ) : (
                    <div>Ukjent feil</div>
                )}
            </Alert>
        </Box>
    );
}
