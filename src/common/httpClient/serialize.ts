function objectToString(o: unknown): string {
  return Object.prototype.toString.call(o);
}

function isObject(arg: unknown): arg is object {
  return typeof arg === 'object' && arg !== null;
}

export function isDate(date: unknown): date is Date {
  return isObject(date) && objectToString(date) === '[object Date]';
}

export function serializeWithDatesAsIsoString(_key: string, value: unknown): unknown {
  return isDate(value) ? value.toISOString() : value;
}
