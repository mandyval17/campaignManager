import dayjs from 'dayjs';

/**
 * Returns default date range query string for the past 7 days.
 * @returns an object with startTS and endTS properties as ISO strings.
 */
export const getDefaultDrQS = () => {
  return {
    startTS: dayjs().subtract(7, 'day').startOf('day').toISOString(),
    endTS: dayjs().endOf('day').toISOString(),
  }
};