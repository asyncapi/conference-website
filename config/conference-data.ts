import thirdPartyAgendaJson from './third-party/agenda.json';
import thirdPartyCitiesJson from './third-party/city-lists.json';
import thirdPartySpeakersJson from './third-party/speakers.json';
import pretalxAgendaJson from './pretalx/agenda.json';
import pretalxCitiesJson from './pretalx/city-lists.json';
import pretalxSpeakersJson from './pretalx/speakers.json';
import { Agenda, City, Speaker } from '../types/types';

const thirdPartyCities = thirdPartyCitiesJson as City[];
const pretalxCities = pretalxCitiesJson as City[];
const thirdPartySpeakers = thirdPartySpeakersJson as Speaker[];
const pretalxSpeakers = pretalxSpeakersJson as Speaker[];
const thirdPartyAgenda = thirdPartyAgendaJson as Agenda[];
const pretalxAgenda = pretalxAgendaJson as Agenda[];

export const cities: City[] = mergeCities(thirdPartyCities, pretalxCities);

const mergedSchedule = mergeScheduleData(
  thirdPartySpeakers,
  thirdPartyAgenda,
  pretalxSpeakers,
  pretalxAgenda
);

export const speakers: Speaker[] = mergedSchedule.speakers;
export const agenda: Agenda[] = mergedSchedule.agenda;

function mergeCities(manualCities: City[], generatedCities: City[]): City[] {
  const mergedCities = [...manualCities];

  for (const generatedCity of generatedCities) {
    const existingIndex = findMergeableCityIndex(mergedCities, generatedCity);

    if (existingIndex === -1) {
      mergedCities.push(generatedCity);
      continue;
    }

    mergedCities[existingIndex] = mergeCity(
      mergedCities[existingIndex],
      generatedCity
    );
  }

  return mergedCities;
}

function findMergeableCityIndex(citiesToSearch: City[], generatedCity: City) {
  const generatedSlug = getPretalxEventSlug(generatedCity);
  const generatedName = normalize(generatedCity.name);

  return citiesToSearch.findIndex((city) => {
    const citySlug = getPretalxEventSlug(city);

    if (generatedSlug && citySlug === generatedSlug) {
      return true;
    }

    if (typeof city.cfp === 'string') {
      return false;
    }

    return Boolean(generatedName && normalize(city.name) === generatedName);
  });
}

function mergeCity(manualCity: City, generatedCity: City): City {
  return {
    ...generatedCity,
    ...manualCity,
    date: generatedCity.date || manualCity.date,
    cfpDate:
      manualCity.cfpDate && manualCity.cfpDate !== 'Not announced yet'
        ? manualCity.cfpDate
        : generatedCity.cfpDate,
    cfp: generatedCity.cfp || manualCity.cfp,
    mapUrl: manualCity.mapUrl || generatedCity.mapUrl,
    sponsors:
      manualCity.sponsors?.eventSponsors?.length > 0
        ? manualCity.sponsors
        : generatedCity.sponsors,
  };
}

function mergeScheduleData(
  manualSpeakers: Speaker[],
  manualAgenda: Agenda[],
  generatedSpeakers: Speaker[],
  generatedAgenda: Agenda[]
) {
  const speakers = [...manualSpeakers];
  const agenda = [...manualAgenda];
  const speakerIdMap = new Map<number, number>();

  for (const speaker of generatedSpeakers) {
    const nextSpeakerId = speakers.length + 1;
    speakerIdMap.set(speaker.id, nextSpeakerId);
    speakers.push({
      ...speaker,
      id: nextSpeakerId,
    });
  }

  for (const item of generatedAgenda) {
    agenda.push({
      ...item,
      speaker: remapSpeakerReference(item.speaker, speakerIdMap),
    });
  }

  return { speakers, agenda };
}

function remapSpeakerReference(
  speakerReference: number | number[],
  speakerIdMap: Map<number, number>
) {
  if (Array.isArray(speakerReference)) {
    return speakerReference.map(
      (speakerId) => speakerIdMap.get(speakerId) ?? speakerId
    );
  }

  return speakerIdMap.get(speakerReference) ?? speakerReference;
}

function getPretalxEventSlug(city: City): string | null {
  if (!city.cfp || typeof city.cfp === 'string') {
    return null;
  }

  return city.cfp.provider === 'pretalx' ? city.cfp.eventSlug : null;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}
