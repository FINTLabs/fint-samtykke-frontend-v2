import type { Consent } from '~/utils/types';
import { Table } from '@navikt/ds-react';
import { ConsentSwitch } from '~/components/ConsentSwitch';
import { useState } from 'react';

export const ConsentTable = ({
    consents,
    handleChange,
    activeConsentIds,
    loading,
}: {
    consents: Consent[];
    handleChange: (event: any, consent: Consent) => void;
    activeConsentIds: string[];
    loading?: string;
}) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Tjeneste</Table.HeaderCell>
                    <Table.HeaderCell>Personopplysning</Table.HeaderCell>
                    <Table.HeaderCell>Formål</Table.HeaderCell>
                    <Table.HeaderCell>Samtykke</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {consents.map((consent, key) => (
                    <Table.Row key={key}>
                        <Table.DataCell>{consent.processorName}</Table.DataCell>
                        <Table.DataCell>{consent.personalDataName}</Table.DataCell>
                        <Table.DataCell>{consent.processing.formal}</Table.DataCell>
                        <Table.DataCell>
                            <ConsentSwitch
                                loading={loading === consent.systemIdValue}
                                value={consent.systemIdValue}
                                checked={activeConsentIds.includes(consent.systemIdValue)}
                                onChange={(e) => handleChange(e, consent)}
                                label={consent.processorName}
                            />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
