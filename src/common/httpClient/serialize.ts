import { isDate } from 'util/types';

export function serializeWithDatesAsIsoString(key: string, value: unknown): unknown {
  return isDate(value) ? value.toISOString() : value;
}
