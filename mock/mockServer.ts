import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import type { Consent } from '~/utils/types';

const consents: Consent[] = [
    {
        systemIdValue: '4c7d41a3-74b6-4449-a8d8-b980af3b2226',
        processorName: 'VIS',
        expirationDate: null,
        active: false,
        personalDataName: 'Bilde',
        processing: {
            aktiv: true,
            formal: 'Vise bilde i VIS. Les mer: https://www.rogfk.no/samtykke-bilde-vis',
            systemId: {
                gyldighetsperiode: null,
                identifikatorverdi: '4c7d41a3-74b6-4449-a8d8-b980af3b2226',
            },
            links: {
                tjeneste: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/tjeneste/systemid/urn:vigoiks:personvern:tjeneste:visma:vis',
                    },
                ],
                behandlingsgrunnlag: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
                personopplysning: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/personopplysning/systemid/no.fint.felles.person.bilde',
                    },
                ],
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/behandling/systemid/4c7d41a3-74b6-4449-a8d8-b980af3b2226',
                    },
                ],
            },
        },
        processingBase: {
            links: {
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
            },
            gyldighetsperiode: {
                beskrivelse: null,
                slutt: null,
                start: '2018-07-20T00:00:00Z',
            },
            kode: 'a',
            navn: 'Samtykke',
            passiv: false,
            systemId: {
                gyldighetsperiode: null,
                identifikatorverdi: 'a',
            },
        },
    },
    {
        systemIdValue: 'f46cfa31-0a1b-45a3-9d05-a0e4847b395f',
        processorName: 'ProcessorName1',
        personalDataName: 'Bilde',
        processing: {
            aktiv: true,
            formal: 'Vise bilde i VIS. Les mer: https://www.rogfk.no/samtykke-bilde-vis',
            systemId: {
                gyldighetsperiode: null,
                identifikatorverdi: 'f46cfa31-0a1b-45a3-9d05-a0e4847b395f',
            },
            links: {
                tjeneste: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/tjeneste/systemid/urn:vigoiks:personvern:tjeneste:visma:vis',
                    },
                ],
                behandlingsgrunnlag: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
                personopplysning: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/personopplysning/systemid/no.fint.felles.person.bilde',
                    },
                ],
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/behandling/systemid/4c7d41a3-74b6-4449-a8d8-b980af3b2226',
                    },
                ],
            },
        },
        expirationDate: 'expirationDate',
        active: true,
        processingBase: {
            links: {
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
            },
        },
    },
    {
        systemIdValue: 'fd5050ea-7a2a-4b1c-8736-dfddbc843a11',
        processorName: 'ProcessorName2',
        personalDataName: 'Bilde',
        processing: {
            aktiv: true,
            formal: 'Vise bilde i VIS. Les mer: https://www.rogfk.no/samtykke-bilde-vis',
            systemId: {
                gyldighetsperiode: null,
                identifikatorverdi: 'fd5050ea-7a2a-4b1c-8736-dfddbc843a11',
            },
            links: {
                tjeneste: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/tjeneste/systemid/urn:vigoiks:personvern:tjeneste:visma:vis',
                    },
                ],
                behandlingsgrunnlag: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
                personopplysning: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/personopplysning/systemid/no.fint.felles.person.bilde',
                    },
                ],
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/behandling/systemid/4c7d41a3-74b6-4449-a8d8-b980af3b2226',
                    },
                ],
            },
        },
        expirationDate: 'expirationDate',
        active: true,
        processingBase: {
            links: {
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
            },
        },
    },
    {
        systemIdValue: 'ce4f3e26-5db5-4893-8f42-feaf166e88f1',
        processorName: 'ProcessorName3',
        personalDataName: 'Bilde',
        processing: {
            aktiv: true,
            formal: 'Vise bilde i VIS. Les mer: https://www.rogfk.no/samtykke-bilde-vis',
            systemId: {
                gyldighetsperiode: null,
                identifikatorverdi: 'ce4f3e26-5db5-4893-8f42-feaf166e88f1',
            },
            links: {
                tjeneste: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/tjeneste/systemid/urn:vigoiks:personvern:tjeneste:visma:vis',
                    },
                ],
                behandlingsgrunnlag: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
                personopplysning: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/personopplysning/systemid/no.fint.felles.person.bilde',
                    },
                ],
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/samtykke/behandling/systemid/4c7d41a3-74b6-4449-a8d8-b980af3b2226',
                    },
                ],
            },
        },
        expirationDate: 'expirationDate',
        active: true,
        processingBase: {
            links: {
                self: [
                    {
                        href: 'https://beta.felleskomponent.no/personvern/kodeverk/behandlingsgrunnlag/systemid/a',
                    },
                ],
            },
        },
    },
];

// @ts-ignore
export const mockServer = setupServer(
    ...[
        http.get('http://localhost:8080/beta/fintlabs-no/consents', async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return HttpResponse.json<Consent[]>(consents);
        }),
        http.post(
            'http://localhost:8080/beta/fintlabs-no/consents/:processingId',
            async (resolver) => {
                const { processingId } = resolver.params;
                const consent = consents.find(
                    (c) => c.processing.systemId.identifikatorverdi === processingId
                );

                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (consent) {
                    return HttpResponse.json(consent, { status: 200 });
                } else {
                    return HttpResponse.json({ error: 'Consent not found' }, { status: 404 });
                }
            }
        ),
        http.put(
            'http://localhost:8080/beta/fintlabs-no/consents/:systemIdValue/:processingId/:isActive',
            async (resolver) => {
                const { processingId, isActive } = resolver.params;
                const consent = consents.find(
                    (c) => c.processing.systemId.identifikatorverdi === processingId
                );

                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (consent) {
                    return HttpResponse.json({ ...consent, active: isActive }, { status: 200 });
                } else {
                    return HttpResponse.json({ error: 'Consent not found' }, { status: 404 });
                }
            }
        ),
    ]
);
