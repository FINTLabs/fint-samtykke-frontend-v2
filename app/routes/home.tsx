import type { Route } from './+types/home';
import { createConsent, fetchConsent, updateConsent } from '~/api/fetch-consent';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';
import type { Consent } from '~/utils/types';
import { useSubmit, type ActionFunctionArgs } from 'react-router';

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
        console.log('handleSubmit', consent);
        const formData = new FormData();
        formData.append('processingId', consent.processing.systemId.identifikatorverdi);
        formData.append('consentId', consent.systemIdValue);
        formData.append('isActive', String(isActive));
        if (consent.expirationDate === null) {
            console.log('create consent');
            submit(formData, { method: 'post' });
        } else {
            console.log('update consent');
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
            const response = await createConsent(request, processingId);
            return { didUpdate: !!response };
        } else if (request.method === 'PUT') {
            const response = await updateConsent(request, processingId, consentId, isActive);
            return { didUpdate: response.status === 204 };
        }
    }
}
