import type { Consent } from '~/utils/types';
import { Hide, Show } from '@navikt/ds-react';
import { ConsentTable } from '~/components/ConsentTable';
import { ConsentList } from '~/components/ConsentList';
import React, { type ChangeEvent, useMemo, useState } from 'react';

export const Consents = ({
    consents,
    handleSubmit,
    loading,
}: {
    consents: Consent[];
    handleSubmit: (consent: Consent, isActive: boolean) => void;
    loading?: string;
}) => {
    const memoizedActiveConsents = useMemo(
        () => consents.filter((x) => x.active).map((x) => x.systemIdValue),
        [consents]
    );
    const [activeConsents, setActiveConsents] = useState<string[]>(
        consents.filter((x) => x.active).map((x) => x.systemIdValue)
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>, consent: Consent) => {
        const checkedValue = e.target.value;
        const isChecked = e.target.checked;
        /*        const newActiveConsents = isChecked
            ? [...activeConsents, checkedValue]
            : activeConsents.filter((x) => x !== checkedValue);
        setActiveConsents(newActiveConsents);*/
        handleSubmit(consent, isChecked);
    };
    return (
        <>
            <Hide below="md">
                <ConsentTable
                    consents={consents}
                    handleChange={handleChange}
                    activeConsentIds={memoizedActiveConsents}
                    loading={loading}
                />
            </Hide>
            <Show below="md">
                <ConsentList
                    consents={consents}
                    handleChange={handleChange}
                    activeConsentIds={memoizedActiveConsents}
                />
            </Show>
        </>
    );
};
