// @ts-check

const MONTHS = new Map([
  ['january', 0],
  ['february', 1],
  ['march', 2],
  ['april', 3],
  ['may', 4],
  ['june', 5],
  ['july', 6],
  ['august', 7],
  ['september', 8],
  ['october', 9],
  ['november', 10],
  ['december', 11],
]);

/**
 * @param {string | null | undefined} cfpDate
 * @returns {Date | null}
 */
function parseCfpDeadline(cfpDate) {
  const normalized = cfpDate?.trim();

  if (!normalized || normalized.toLowerCase() === 'not announced yet') {
    return null;
  }

  const match = normalized.match(/^(\d{1,2})\s+([a-zA-Z]+),?\s+(\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = MONTHS.get(match[2].toLowerCase());
  const year = Number(match[3]);

  if (month === undefined) {
    return null;
  }

  return new Date(year, month, day, 23, 59, 59, 999);
}

/**
 * @param {string | null | undefined} cfpDate
 * @param {Date} [now]
 * @returns {boolean}
 */
function isCfpDeadlinePassed(cfpDate, now = new Date()) {
  const deadline = parseCfpDeadline(cfpDate);

  return deadline ? now.getTime() > deadline.getTime() : false;
}

module.exports = {
  isCfpDeadlinePassed,
  parseCfpDeadline,
};
