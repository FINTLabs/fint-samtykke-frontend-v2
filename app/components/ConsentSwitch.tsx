import { Switch } from '@navikt/ds-react';
import React, { type ChangeEvent } from 'react';

export const ConsentSwitch = ({
    value,
    checked,
    onChange,
    label,
    loading,
}: {
    value: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    loading?: boolean;
}) => {
    return (
        <Switch
            loading={loading}
            size="small"
            value={value}
            checked={checked}
            onChange={onChange}
            hideLabel={true}>
            {label}
        </Switch>
    );
};
