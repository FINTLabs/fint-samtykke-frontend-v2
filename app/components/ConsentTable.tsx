import type { Consent } from '~/utils/types';
import { Switch, Table } from '@navikt/ds-react';
import { type ChangeEvent, useState } from 'react';

export const ConsentTable = ({
    consents,
    handleSubmit,
}: {
    consents: Consent[];
    handleSubmit: (consent: Consent, isActive: boolean) => void;
}) => {
    const [activeConsents, setActiveConsents] = useState<string[]>(
        consents.filter((x) => x.active).map((x) => x.systemIdValue)
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>, consent: Consent) => {
        const checkedValue = e.target.value;
        const isChecked = e.target.checked;
        const newActiveConsents = isChecked
            ? [...activeConsents, checkedValue]
            : activeConsents.filter((x) => x !== checkedValue);
        setActiveConsents(newActiveConsents);
        handleSubmit(consent, isChecked);
    };

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
                            <Switch
                                size="small"
                                value={consent.systemIdValue}
                                checked={activeConsents.includes(consent.systemIdValue)}
                                onChange={(e) => handleChange(e, consent)}
                                hideLabel={true}>
                                {consent.processorName}
                            </Switch>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
