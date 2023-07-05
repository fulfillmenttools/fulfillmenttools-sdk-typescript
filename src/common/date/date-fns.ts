import {
  addDays,
  addSeconds,
  isAfter,
  isBefore,
  startOfDay,
  startOfToday,
  addHours,
  addMinutes,
  isWithinInterval,
  intervalToDuration,
  subMinutes,
  subSeconds,
  parseISO,
} from 'date-fns';

export {
  addDays,
  addSeconds,
  isAfter,
  isBefore,
  startOfDay,
  startOfToday,
  addHours,
  addMinutes,
  isWithinInterval,
  intervalToDuration,
  subMinutes,
  subSeconds,
  parseISO,
};

export function now() {
  return new Date();
}

export function getWeekdayNameForTimeZoneFromDate(date: Date, timeZone: string): string {
  return date.toLocaleString('en-US', { weekday: 'long', timeZone }).toLowerCase();
}
