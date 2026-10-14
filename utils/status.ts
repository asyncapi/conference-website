import { ConferenceStatus } from '../types/types';

function parseDateRange(date: string): Date[] {
  const fullRangeMatch = date.match(
    /^(\d{1,2}\s+\w+,?\s+\d{4})\s*-\s*(\d{1,2}\s+\w+,?\s+\d{4})$/
  );
  if (fullRangeMatch) {
    return [new Date(fullRangeMatch[1]), new Date(fullRangeMatch[2])];
  }

  const dayRangeMatch = date.match(
    /^(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\w+,?\s+\d{4})$/
  );
  if (dayRangeMatch) {
    const monthYear = dayRangeMatch[3];
    return [
      new Date(`${dayRangeMatch[1]} ${monthYear}`),
      new Date(`${dayRangeMatch[2]} ${monthYear}`),
    ];
  }

  return [new Date(date)];
}

export function getEventStatus(date: string) {
  const today = new Date();
  const eventDates = parseDateRange(date);

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
