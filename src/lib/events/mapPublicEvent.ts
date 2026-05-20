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
  slotsByDay: {
    date: string;
    slots: {
      startTime: string;
      endTime: string;
      courtNames: string[];
    }[];
  }[];
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
  slotsPrDag: {
    dato: string;
    slots: {
      startTid: string;
      sluttTid: string;
      baneNavn: string[];
    }[];
  }[];
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
    slotsByDay: (api.slotsPrDag ?? []).map((dag) => ({
      date: dag.dato,
      slots: dag.slots.map((s) => ({
        startTime: s.startTid,
        endTime: s.sluttTid,
        courtNames: s.baneNavn,
      })),
    })),
  };
}
