type Link = {
    href: string;
    rel?: string;
};

type LinkMap = Record<string, Link[]>;

type Identifikator = {
    gyldighetsperiode: string | null;
    identifikatorverdi: string;
};

type BehandlingResource = {
    aktiv: boolean;
    formal: string;
    systemId: Identifikator;
    links: LinkMap; // Map<String, List<Link>>
};

type BehandlingsgrunnlagResource = {
    links: LinkMap;
    gyldighetsperiode?: {
        beskrivelse: string | null;
        slutt: string | null;
        start: string | null;
    };
    kode?: string;
    navn?: string;
    passiv?: false;
    systemId?: Identifikator;
};

export type Consent = {
    systemIdValue: string;
    processorName: string;
    expirationDate: string | null; // periode???
    active: boolean;
    personalDataName: string;
    processing: BehandlingResource;
    processingBase: BehandlingsgrunnlagResource;
};
