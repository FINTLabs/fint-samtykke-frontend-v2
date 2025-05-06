import { Switch } from '@navikt/ds-react';
import React, { type ChangeEvent, useEffect, useState } from 'react';

export const ConsentSwitch = ({
    value,
    checked,
    onChange,
    label,
}: {
    value: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
}) => {
    return (
        <Switch size="small" value={value} checked={checked} onChange={onChange} hideLabel={true}>
            {label}
        </Switch>
    );
};
