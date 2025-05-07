import type { Consent } from '~/utils/types';
import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import { ConsentSwitch } from '~/components/ConsentSwitch';

export const ConsentList = ({
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
                                <ConsentSwitch
                                    loading={loading === consent.systemIdValue}
                                    value={consent.systemIdValue}
                                    checked={activeConsentIds.includes(consent.systemIdValue)}
                                    onChange={(e) => handleChange(e, consent)}
                                    label={consent.processorName}
                                />
                            </Box>
                        </HStack>
                        <BodyShort>{consent.processing.formal}</BodyShort>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
