import type { Consent } from '~/utils/types';
import { BodyShort, Box, Detail, Heading, HStack, Switch, Table, VStack } from '@navikt/ds-react';
import { type ChangeEvent, useState } from 'react';

export const ConsentList = ({
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
        <VStack gap={'4'}>
            {consents.map((consent, key) => (
                <Box
                    key={key}
                    paddingInline="4"
                    paddingBlock="4 6"
                    borderRadius="large"
                    borderColor="border-divider"
                    borderWidth="1">
                    <VStack gap={'4'}>
                        <HStack justify={'space-between'}>
                            <VStack>
                                <BodyShort size="medium">
                                    Tjeneste: <b>{consent.processorName}</b>
                                </BodyShort>
                                <BodyShort size="medium">
                                    Personopplysning: <b>{consent.personalDataName}</b>
                                </BodyShort>
                            </VStack>
                            <Box style={{ boxSizing: 'border-box' }} width={'50px'}>
                                <Switch
                                    size="small"
                                    value={consent.systemIdValue}
                                    checked={activeConsents.includes(consent.systemIdValue)}
                                    onChange={(e) => handleChange(e, consent)}
                                    hideLabel={true}>
                                    {consent.processorName}
                                </Switch>
                            </Box>
                        </HStack>
                        <BodyShort>{consent.processing.formal}</BodyShort>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
