export type PresentationType =
  | "EnkeltDato"
  | "DatoIntervallAlleDager"
  | "DatoIntervallUkedager"
  | "Uregelmessig";

export type EventPresentation = {
  type: PresentationType;
  startDate: string;
  endDate: string;
  weekdays: string[];
  times: string[];
  courtNames: string[];
  hasDeviatingSlots: boolean;
};

export type PublicClubEvent = {
  id: string;
  arrangementId: string;
  bookingUrl: string;
  title: string;
  description?: string;
  category: string;
  startDate: string;
  endDate: string;
  courtGroups: {
    courtIds: string[];
    courtNames: string[];
    times: string[];
    slotLengthMinutes: number;
  }[];
  weekdays: string[];
  allowsSignup: boolean;
  signupCount: number;
  isPast: boolean;
  presentation: EventPresentation;
};

type ApiEvent = {
  arrangementId: string;
  tittel: string;
  beskrivelse?: string;
  kategori: string;
  startDato: string;
  sluttDato: string;
  baneGrupper: {
    baneIder: string[];
    baneNavn: string[];
    tidspunkter: string[];
    slotLengdeMinutter: number;
  }[];
  ukedager: string[];
  tillaterPaamelding: boolean;
  antallPaameldte: number;
  erPassert: boolean;
  presentasjon: {
    type: string;
    startDato: string;
    sluttDato: string;
    ukedager: string[];
    tidspunkter: string[];
    baneNavn: string[];
    harAvvikendeSlots: boolean;
  };
};

export function mapPublicEvent(api: ApiEvent): PublicClubEvent {
  const baseUrl = (import.meta.env.PUBLIC_BOOKING_URL ?? '').replace(/\/$/, '');
  const bookingUrl = `${baseUrl}/arrangementer?arrangement=${api.arrangementId}`;
  return {
    id: api.arrangementId,
    arrangementId: api.arrangementId,
    bookingUrl,
    title: api.tittel,
    description: api.beskrivelse,
    category: api.kategori,
    startDate: api.startDato,
    endDate: api.sluttDato,
    courtGroups: api.baneGrupper.map((g) => ({
      courtIds: g.baneIder,
      courtNames: g.baneNavn,
      times: g.tidspunkter,
      slotLengthMinutes: g.slotLengdeMinutter,
    })),
    weekdays: api.ukedager,
    allowsSignup: api.tillaterPaamelding,
    signupCount: api.antallPaameldte,
    isPast: api.erPassert,
    presentation: {
      type: api.presentasjon.type as PresentationType,
      startDate: api.presentasjon.startDato,
      endDate: api.presentasjon.sluttDato,
      weekdays: api.presentasjon.ukedager,
      times: api.presentasjon.tidspunkter,
      courtNames: api.presentasjon.baneNavn,
      hasDeviatingSlots: api.presentasjon.harAvvikendeSlots,
    },
  };
}
