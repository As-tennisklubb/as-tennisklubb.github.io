export type PublicClubEvent = {
  id: string;
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
};

type ApiEvent = {
  id: string;
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
};

export function mapPublicEvent(api: ApiEvent): PublicClubEvent {
  return {
    id: api.id,
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
  };
}
