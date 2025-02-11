import { BodyShort, Heading, HStack, Page } from '@navikt/ds-react';

const Header = () => {
    return (
        <Page.Block as={'header'} className={'novari-header h-20'}>
            <HStack
                as="nav"
                justify="space-between"
                align="center"
                className={'h-full'}
                paddingInline={{ xs: '12', sm: '12', md: '12', lg: '20', xl: '32' }}>
                <HStack align="center">
                    <BodyShort
                        weight="semibold"
                        size={'large'}
                        style={{ color: 'var(--red-primary)' }}>
                        FINT Samtykke
                    </BodyShort>
                </HStack>
            </HStack>
        </Page.Block>
    );
};

export default Header;
