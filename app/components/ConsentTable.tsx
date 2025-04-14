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
                    <Table.HeaderCell align={'right'}>Samtykke</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {consents.map((consent) => (
                    <Table.Row>
                        <Table.DataCell>{consent.processorName}</Table.DataCell>
                        <Table.DataCell>{consent.personalDataName}</Table.DataCell>
                        <Table.DataCell>{consent.processing.formal}</Table.DataCell>
                        <Table.DataCell align={'right'}>
                            <Switch
                                value={consent.systemIdValue}
                                checked={activeConsents.includes(consent.systemIdValue)}
                                onChange={(e) => handleChange(e, consent)}
                                hideLabel={true}>
                                Samtykke
                            </Switch>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
