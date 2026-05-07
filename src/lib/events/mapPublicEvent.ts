export type PublicClubEvent = {
  id: string;
  arrangementId: string;
  title: string;
  description?: string;
  grenNavn: string;
  grenSlug: string;
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
  isPast: boolean;
  hasDeviatingSlots: boolean;
};

type ApiEvent = {
  arrangementId: string;
  tittel: string;
  beskrivelse?: string;
  grenNavn?: string;
  grenSlug?: string;
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
  erPassert: boolean;
  harAvvikendeSlots: boolean;
};

export function mapPublicEvent(api: ApiEvent): PublicClubEvent {
  return {
    id: api.arrangementId,
    arrangementId: api.arrangementId,
    title: api.tittel,
    description: api.beskrivelse,
    grenNavn: api.grenNavn ?? "Tennis",
    grenSlug: api.grenSlug ?? "tennis",
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
    isPast: api.erPassert,
    hasDeviatingSlots: api.harAvvikendeSlots,
  };
}
