import { ConferenceStatus } from '../types/types';
import { isPastEvent } from './isPastEvent';

function parseStartDate(parts: string[]): Date {
  const startPart = parts[0];
  const endPart = parts[parts.length - 1];
  if (/^\d{1,2}$/.test(startPart)) {
    const endDate = new Date(endPart);
    if (isNaN(endDate.getTime())) {
      return new Date('invalid');
    }
    const monthYear = endDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    return new Date(`${startPart} ${monthYear}`);
  }
  return new Date(startPart);
}
export function getEventStatus(date: string): ConferenceStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  if (isPastEvent(date)) {
    return ConferenceStatus.ENDED;
  }
  const parts = date.split('-').map((d) => d.trim());
  const startDate = parseStartDate(parts);
  if (isNaN(startDate.getTime())) {
    return ConferenceStatus.ENDED;
  }
  startDate.setHours(0, 0, 0, 0);
  if (today < startDate) {
    return ConferenceStatus.UPCOMING;
  }
  return ConferenceStatus.ONGOING;
}