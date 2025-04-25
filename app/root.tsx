import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './novari.css';

import '@navikt/ds-css/dist/index.css';
import navStyles from '@navikt/ds-css/dist/index.css?url';
import React from 'react';
import { Box, Page } from '@navikt/ds-react';
import { NovariIKS } from '~/components/images/NovariIKS';
import Header from '~/components/Header';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: navStyles }];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="no">
            <head>
                <Meta />
                <Links />
                <title>FINT Samtykke</title>
            </head>
            <body data-theme="novari">
                <Page
                    footer={
                        <Box className={'novari-footer'} padding="8" as="footer">
                            <NovariIKS width={'9em'} />
                        </Box>
                    }>
                    <Header />
                    <Page.Block as={'main'} gutters>
                        {children}
                        <ScrollRestoration />
                        <Scripts />
                    </Page.Block>
                </Page>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            message = 'Vi kunne ikke finne siden du ser etter.';
            details = error.data || 'Gå tilbake til hovedsiden og prøv igjen';
        } else if (error.status === 500) {
            message = 'Serverfeil';
            details = error.data || 'Kunne ikke kontakte serveren.';
        }
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <div>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </div>
    );
}
