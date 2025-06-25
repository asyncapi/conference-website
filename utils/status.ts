import { ConferenceStatus } from '../types/types';

export function getEventStatus(date: string) {
  const today = new Date();
  const eventDates = date.split('-').map((d) => new Date(d));

  if (
    eventDates.some((event) => event.toDateString() === today.toDateString())
  ) {
    return ConferenceStatus.ONGOING;
  } else if (eventDates.some((event) => event > today)) {
    return ConferenceStatus.UPCOMING;
  } else {
    return ConferenceStatus.ENDED;
  }
}
