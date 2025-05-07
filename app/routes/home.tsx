import type { Route } from './+types/home';
import { createConsent, fetchConsent, updateConsent } from '~/api/fetch-consent';
import { Alert, BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import type { Consent } from '~/utils/types';
import { useSubmit, type ActionFunctionArgs, useRouteError, useActionData } from 'react-router';
import { Consents } from '~/components/Consents';
import { useEffect, useState } from 'react';

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

const Home = ({ loaderData, actionData }: Route.ComponentProps) => {
    const { consents } = loaderData;
    const submit = useSubmit();
    const [loading, setLoading] = useState<string | undefined>(undefined);

    useEffect(() => {
        console.log('Data from action:', actionData);
    }, [actionData]);

    useEffect(() => {
        console.log('Loader data length:', loaderData?.consents.length);
        console.log(
            'Loader data:',
            loaderData?.consents?.map((consent: Consent) => consent.active)
        );
    }, [loaderData]);

    const handleSubmit = (consent: Consent, isActive: boolean) => {
        setLoading(consent.systemIdValue);
        const formData = new FormData();
        formData.append('processingId', consent.processing.systemId.identifikatorverdi);
        formData.append('consentId', consent.systemIdValue);
        formData.append('isActive', String(isActive));
        submit(formData, {
            method: consent.expirationDate === null ? 'POST' : 'PUT',
        }).then((res) => {
            console.log('Submit return:', res);
            setLoading(undefined);
        });
    };

    return (
        <VStack gap={'4'} paddingBlock={'12'}>
            <BodyShort>
                Status: {actionData?.state}: {actionData?.active}
            </BodyShort>
            <Heading size="large">Velkommen til FINT Samtykke</Heading>
            <BodyShort>
                Denne siden gir deg oversikt over dine samtykker. Du kan gi og trekke tilbake
                samtykker her.
            </BodyShort>
            <Consents consents={consents} handleSubmit={handleSubmit} loading={loading} />
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

        console.log('Action triggered with:', { processingId, consentId, isActive });

        if (processingId) {
            if (request.method === 'POST') {
                const res = await createConsent(request, processingId);
                console.log('POST result:', res);
                return { systemIdValue: res.systemIdValue, state: 'created', active: res.active };
            } else if (request.method === 'PUT') {
                const res = await updateConsent(request, processingId, consentId, isActive);
                console.log('PUT result:', res);
                return { systemIdValue: res.systemIdValue, state: 'updated', active: res.active };
            }
        }
        return { error: 'Invalid processingId or unsupported method' };
    } catch (error) {
        console.error('Action error:', error);
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
