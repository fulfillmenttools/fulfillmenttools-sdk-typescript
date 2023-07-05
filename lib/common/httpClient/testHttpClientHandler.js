"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHttpClientHandler = void 0;
class TestHttpClientHandler {
    constructor() {
        this.expectedCalls = [];
        this.alwaysExpectedCalls = [];
        this.notExpectedRequests = [];
        this.notExpectedRequestsCalled = [];
    }
    /**
     * Adds expected calls to the mock list, so that when requested the mocks can be
     * returned by the TestHttpClient
     * @param request
     */
    expectOne(request) {
        this.expectedCalls.push(request);
    }
    expectAlways(request) {
        this.alwaysExpectedCalls.push(request);
    }
    expectNone(request) {
        this.notExpectedRequests.push(request);
    }
    /**
     * Only used internally by TestHttpClient
     * @param request
     */
    lookupRequest(request) {
        // const combinedUrl = this.generateCombinedUrl(request);
        if (this.notExpectedRequests.some((call) => this.callMatchesRequest(call, request))) {
            this.notExpectedRequestsCalled.push(request);
            return request;
        }
        const alwaysExpectedCallIndex = this.alwaysExpectedCalls.findIndex((call) => this.callMatchesRequest(call, request));
        if (alwaysExpectedCallIndex > -1) {
            return this.alwaysExpectedCalls[alwaysExpectedCallIndex];
        }
        const expectedCallIndex = this.expectedCalls.findIndex((call) => this.callMatchesRequest(call, request));
        if (expectedCallIndex > -1) {
            const expectedCall = this.expectedCalls[expectedCallIndex];
            this.expectedCalls.splice(expectedCallIndex, 1);
            return expectedCall;
        }
        return undefined;
    }
    throwIfNotExpectedCallsWhereMade() {
        const notExpectedRequestsCalledCopy = [...this.notExpectedRequestsCalled];
        this.notExpectedRequests.length = 0;
        this.notExpectedRequestsCalled.length = 0;
        if (notExpectedRequestsCalledCopy.length > 0) {
            const message = `The following requests should not have been made: [${notExpectedRequestsCalledCopy
                .map((request) => `${request.method} - ${request.url}`)
                .join(',')}]`;
            throw new Error(message);
        }
    }
    throwIfExpectedCallsAreStillPresent() {
        const expectedCallsCopy = [...this.expectedCalls];
        this.expectedCalls.length = 0;
        if (expectedCallsCopy.length > 0) {
            throw new Error(`Not all expected http calls have been used. ${expectedCallsCopy
                .map((c) => `${c.method} - ${this.generateCombinedUrl(c)}`)
                .join('; ')}`);
        }
    }
    generateCombinedUrl(request) {
        return request.params
            ? `${request.url}?${Object.entries(request.params)
                .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
                .join('&')}`
            : request.url;
    }
    paramsAreEqual(a, b, ignoreKeys) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        const equal = this.aEntriesPresentInB(a, b, ignoreKeys) && this.aEntriesPresentInB(b, a, ignoreKeys);
        // console.log(`${Object.entries(a)} : ${Object.entries(b)} => equal: ${equal}`);
        return equal;
    }
    aEntriesPresentInB(a, b, ignoreKeys) {
        let entries = Object.entries(a);
        if (ignoreKeys) {
            entries = entries.filter((entry) => !ignoreKeys.some((key) => entry[0] === key));
        }
        return entries.every((aEntry) => Object.entries(b).some((bEntry) => aEntry[0] === bEntry[0] && aEntry[1] === bEntry[1]));
    }
    callMatchesRequest(call, request) {
        return (call.url === request.url &&
            call.method === request.method &&
            this.paramsAreEqual(call.params, request.params, call.ignoreParams));
    }
}
exports.TestHttpClientHandler = TestHttpClientHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEh0dHBDbGllbnRIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9odHRwQ2xpZW50L3Rlc3RIdHRwQ2xpZW50SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF5QkEsTUFBYSxxQkFBcUI7SUFBbEM7UUFDbUIsa0JBQWEsR0FBc0IsRUFBRSxDQUFDO1FBRXRDLHdCQUFtQixHQUFzQixFQUFFLENBQUM7UUFFNUMsd0JBQW1CLEdBQXNCLEVBQUUsQ0FBQztRQUU1Qyw4QkFBeUIsR0FBMkIsRUFBRSxDQUFDO0lBMkcxRSxDQUFDO0lBekdDOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsT0FBd0I7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLFlBQVksQ0FBQyxPQUF3QjtRQUMxQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxVQUFVLENBQUMsT0FBd0I7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBYSxDQUFDLE9BQTZCO1FBQ2hELHlEQUF5RDtRQUN6RCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNuRixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FD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