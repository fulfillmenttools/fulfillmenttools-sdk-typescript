import { serializeWithDatesAsIsoString } from './serialize';

describe('serializeWithDatesAsIsoString', () => {
  const now = new Date();
  const innerInner = { foo: 1 };
  const inner = { foo: 1, bar: now, innerInner };
  const payload = { foo: 'hallo', bar: now, inner };
  const serialized = JSON.stringify(payload, serializeWithDatesAsIsoString);
  it('serializes dates correctly to isoStrings', () => {
    expect(serialized).toEqual(
      `{"foo":"hallo","bar":"${now.toISOString()}","inner":{"foo":1,"bar":"${now.toISOString()}","innerInner":{"foo":1}}}`
    );
  });
  it('creates a parsable json string', () => {
    const parsed = JSON.parse(serialized);
    expect(parsed.foo).toEqual('hallo');
    expect(parsed.bar).toEqual(now.toISOString());
    expect(parsed.inner.bar).toEqual(now.toISOString());
    expect(parsed.inner.innerInner).toEqual(innerInner);
  });
});
