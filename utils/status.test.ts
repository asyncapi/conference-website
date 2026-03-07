// @ts-nocheck

import { getEventStatus } from './status';
import { ConferenceStatus } from '../types/types';

describe('getEventStatus', () => {
  const realNow = Date.now;

  beforeAll(() => {
    Date.now = () => new Date('December 10, 2026').getTime();
  });

  afterAll(() => {
    Date.now = realNow;
  });

  it('handles numeric start date ranges correctly', () => {
    expect(getEventStatus('9 - 11 December, 2026')).toBe(
      ConferenceStatus.ONGOING
    );
  });

  it('returns UPCOMING for future events', () => {
    expect(getEventStatus('20 December, 2026')).toBe(
      ConferenceStatus.UPCOMING
    );
  });

  it('returns ENDED for past events', () => {
    expect(getEventStatus('1 - 3 December, 2026')).toBe(
      ConferenceStatus.ENDED
    );
  });
});
