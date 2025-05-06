import type { Consent } from '~/utils/types';
import { Table } from '@navikt/ds-react';
import { ConsentSwitch } from '~/components/ConsentSwitch';

export const ConsentTable = ({
    consents,
    handleChange,
    activeConsentIds,
}: {
    consents: Consent[];
    handleChange: (event: any, consent: Consent) => void;
    activeConsentIds: string[];
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
