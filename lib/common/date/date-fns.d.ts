import { addDays, addSeconds, isAfter, isBefore, startOfDay, startOfToday, addHours, addMinutes, isWithinInterval, intervalToDuration, subMinutes, subSeconds, parseISO } from 'date-fns';
export { addDays, addSeconds, isAfter, isBefore, startOfDay, startOfToday, addHours, addMinutes, isWithinInterval, intervalToDuration, subMinutes, subSeconds, parseISO, };
export declare function now(): Date;
export declare function getWeekdayNameForTimeZoneFromDate(date: Date, timeZone: string): string;
