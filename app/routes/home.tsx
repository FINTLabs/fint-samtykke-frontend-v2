import type { Route } from './+types/home';
import { Welcome } from '~/welcome/welcome';
import { fetchConsent } from '~/api/fetch-consent';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';

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
    console.log(consents);
    return { consents };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
    const { consents } = loaderData;
    console.log('consents', consents);
    return (
        <VStack gap={'4'} paddingBlock={'12'}>
            <Heading size="large">Velkommen til FINT Samtykke</Heading>
            <BodyShort> Denne siden gir deg oversikt over dine samtykker</BodyShort>
            <ConsentTable consents={consents} />
        </VStack>
    );
};

export default Home;
