import type { Consent } from '~/utils/types';
import { Hide, Show } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';
import { ConsentList } from '~/components/ConsentList';
import React, { useMemo } from 'react';

export const Consents = ({
    consents,
    handleSubmit,
    loading,
}: {
    consents: Consent[];
    handleSubmit: (consent: Consent, isActive: boolean) => void;
    loading?: string;
}) => {
    const activeConsentIds = useMemo(
        () => consents.filter((x) => x.active).map((x) => x.systemIdValue),
        [consents]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, consent: Consent) => {
        handleSubmit(consent, e.target.checked);
    };

    return (
        <>
            <Hide below="md">
                <ConsentTable
                    consents={consents}
                    handleChange={handleChange}
                    activeConsentIds={activeConsentIds}
                    loading={loading}
                />
            </Hide>
            <Show below="md">
                <ConsentList
                    consents={consents}
                    handleChange={handleChange}
                    activeConsentIds={activeConsentIds}
                    loading={loading}
                />
            </Show>
        </>
    );
};
