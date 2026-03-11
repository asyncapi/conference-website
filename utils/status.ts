import { ConferenceStatus } from '../types/types';

// Avoid Date(string); parsing varies across environments
const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function getMonthIndex(value: string): number {
  const lower = value.toLowerCase();

  for (const [name, index] of Object.entries(MONTHS)) {
    if (lower.includes(name)) {
      return index;
    }
  }

  return -1;
}

function getFirstNumber(value: string): number {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : NaN;
}

export function parseEventDateRange(dateString: string): [Date, Date] {
  const yearMatch = dateString.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();

  let parts: string[];

  if (dateString.includes(' - ')) {
    parts = dateString.split(' - ').map((p) => p.trim());
  } else if (/\d+-\d+/.test(dateString)) {
    const match = dateString.match(/^(\d+)-(.+)$/);

    if (match) {
      const start = match[1];
      const rest = match[2].trim();
      parts = [start, rest];
    } else {
      parts = [dateString];
    }
  } else {
    parts = [dateString];
  }

  if (parts.length === 1) {
    const date = new Date(
      year,
      getMonthIndex(parts[0]),
      getFirstNumber(parts[0])
    );

    return [date, date];
  }

  const startMonth = getMonthIndex(parts[0]);
  const endMonth = getMonthIndex(parts[1]);

  // If start part has no month, reuse the month from the end part
  const resolvedStartMonth = startMonth === -1 ? endMonth : startMonth;

  const startDate = new Date(
    year,
    resolvedStartMonth,
    getFirstNumber(parts[0])
  );

  const endDate = new Date(
    year,
    endMonth,
    getFirstNumber(parts[1])
  );

  return [startDate, endDate];
}

export function getEventStatus(date: string): ConferenceStatus {
  const today = new Date();
  const [startDate, endDate] = parseEventDateRange(date);

  if (today >= startDate && today <= endDate) {
    return ConferenceStatus.ONGOING;
  }

  if (startDate > today) {
    return ConferenceStatus.UPCOMING;
  }

  return ConferenceStatus.ENDED;
}
