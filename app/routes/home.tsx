import type { Route } from './+types/home';
import { createConsent, fetchConsent, updateConsent } from '~/api/fetch-consent';
import { Alert, BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import type { Consent } from '~/utils/types';
import { useSubmit, type ActionFunctionArgs, useRouteError } from 'react-router';
import { Consents } from '~/components/Consents';
import { useState } from 'react';

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
    const [loading, setLoading] = useState<string>();

    const handleSubmit = (consent: Consent, isActive: boolean) => {
        setLoading(consent.systemIdValue);
        const formData = new FormData();
        formData.append('processingId', consent.processing.systemId.identifikatorverdi);
        formData.append('consentId', consent.systemIdValue);
        formData.append('isActive', String(isActive));
        submit(formData, {
            method: consent.expirationDate === null ? 'POST' : 'PUT',
        }).then(() => {
            setLoading(undefined);
        });
    };

    return (
        <VStack gap={'4'} paddingBlock={'12'}>
            <Heading size="large">Velkommen til FINT Samtykke</Heading>
            <BodyShort>Her kan du administrere dine samtykker.</BodyShort>
            <Consents consents={consents} handleSubmit={handleSubmit} loading={loading} />
        </VStack>
    );
};

export default Home;

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const processingId = formData.get('processingId')?.toString();
        const consentId = formData.get('consentId')?.toString();
        const isActive = formData.get('isActive')?.toString();

        if (request.method === 'POST' && processingId) {
            const res = await createConsent(request, processingId);
            return { systemIdValue: res.systemIdValue, state: 'created', active: res.active };
        } else if (request.method === 'PUT' && processingId && consentId && isActive) {
            const res = await updateConsent(request, processingId, consentId, isActive);
            return { systemIdValue: res.systemIdValue, state: 'updated', active: res.active };
        }
        return { error: 'Invalid data or unsupported method' };
    } catch (error) {
        return {
            error:
                error instanceof Error
                    ? error.message
                    : `An unknown error occurred during ${request.method === 'POST' ? 'creation' : 'update'} of consent.`,
        };
    }
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);
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
