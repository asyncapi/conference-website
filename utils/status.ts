import { ConferenceStatus } from '../types/types';

export function getEventStatus(
  startDate?: string,
  endDate?: string
): ConferenceStatus {
  if (!startDate) {
    return ConferenceStatus.UPCOMING;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let start = new Date(startDate.replace(/-/g, '/'));
  if (isNaN(start.getTime())) {
    start = new Date(startDate);
  }
  start.setHours(0, 0, 0, 0);

  const endStr = endDate || startDate;
  let end = new Date(endStr.replace(/-/g, '/'));
  if (isNaN(end.getTime())) {
    end = new Date(endStr);
  }
  end.setHours(23, 59, 59, 999);

  if (today >= start && today <= end) {
    return ConferenceStatus.ONGOING;
  } else if (today < start) {
    return ConferenceStatus.UPCOMING;
  } else {
    return ConferenceStatus.ENDED;
  }
}
