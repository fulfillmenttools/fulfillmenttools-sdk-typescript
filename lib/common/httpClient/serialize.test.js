"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_1 = require("./serialize");
describe('serializeWithDatesAsIsoString', () => {
    const now = new Date();
    const innerInner = { foo: 1 };
    const inner = { foo: 1, bar: now, innerInner };
    const payload = { foo: 'hallo', bar: now, inner };
    const serialized = JSON.stringify(payload, serialize_1.serializeWithDatesAsIsoString);
    it('serializes dates correctly to isoStrings', () => {
        expect(serialized).toEqual(`{"foo":"hallo","bar":"${now.toISOString()}","inner":{"foo":1,"bar":"${now.toISOString()}","innerInner":{"foo":1}}}`);
    });
    it('creates a parsable json string', () => {
        const parsed = JSON.parse(serialized);
        expect(parsed.foo).toEqual('hallo');
        expect(parsed.bar).toEqual(now.toISOString());
        expect(parsed.inner.bar).toEqual(now.toISOString());
        expect(parsed.inner.innerInner).toEqual(innerInner);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2h0dHBDbGllbnQvc2VyaWFsaXplLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBNEQ7QUFFNUQsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUM3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3ZCLE1BQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzlCLE1BQU0sS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLHlDQUE2QixDQUFDLENBQUM7SUFDMUUsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsRUFBRTtRQUNsRCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUN4Qix5QkFBeUIsR0FBRyxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsR0FBRyxDQUFDLFdBQVcsRUFBRSw0QkFBNEIsQ0FDckgsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9