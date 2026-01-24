import { ConferenceStatus } from '../types/types';
import { isPastEvent } from './isPastEvent';

export function getEventStatus(date: string): ConferenceStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isPastEvent(date)) {
    return ConferenceStatus.ENDED;
  }
  const parts = date.split('-').map((d) => d.trim());
  const startDate = new Date(parts[0]);
  
  if (isNaN(startDate.getTime())) {
    return ConferenceStatus.ENDED;
  }
  startDate.setHours(0, 0, 0, 0);
  if (today < startDate) {
    return ConferenceStatus.UPCOMING;
  }
  return ConferenceStatus.ONGOING;
}