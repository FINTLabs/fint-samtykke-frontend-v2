import type { Route } from './+types/home';
import { Welcome } from '~/welcome/welcome';
import { Box, Page } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { NovariIKS } from '~/components/images/NovariIKS';
import Header from '~/components/Header';

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

const Home = ({ children }: { children: ReactNode }) => {
    return (
        <Page
            footer={
                <Box className={'novari-footer'} padding="8" as="footer">
                    <NovariIKS width={'9em'} />
                </Box>
            }>
            <Header />
            <Page.Block as={'main'} gutters>
                {children}
            </Page.Block>
        </Page>
    );
};

export default Home;
