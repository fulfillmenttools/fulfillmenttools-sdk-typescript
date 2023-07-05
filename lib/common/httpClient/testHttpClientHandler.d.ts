import { HttpMethod, QueryParams } from './models';
import HttpStatus from 'http-status-enum';
interface BasicTestHttpRequest {
    method: HttpMethod;
    url: string;
    params?: QueryParams;
    ignoreParams?: string[];
}
export interface ResolvedTestHttpRequest<Dto = unknown> extends BasicTestHttpRequest {
    resolveTo: Dto;
    /**
     * if empty resolves to HttpStatus.OK
     */
    resolveStatusCode?: HttpStatus;
}
export interface RejectedTestHttpRequest<TError extends Error = Error> extends BasicTestHttpRequest {
    rejectsTo: TError;
}
export type TestHttpRequest = ResolvedTestHttpRequest | RejectedTestHttpRequest;
export declare class TestHttpClientHandler {
    private readonly expectedCalls;
    private readonly alwaysExpectedCalls;
    private readonly notExpectedRequests;
    private readonly notExpectedRequestsCalled;
    /**
     * Adds expected calls to the mock list, so that when requested the mocks can be
     * returned by the TestHttpClient
     * @param request
     */
    expectOne(request: TestHttpRequest): void;
    expectAlways(request: TestHttpRequest): void;
    expectNone(request: TestHttpRequest): void;
    /**
     * Only used internally by TestHttpClient
     * @param request
     */
    lookupRequest(request: BasicTestHttpRequest): BasicTestHttpRequest | undefined;
    throwIfNotExpectedCallsWhereMade(): void;
    throwIfExpectedCallsAreStillPresent(): void;
    generateCombinedUrl(request: BasicTestHttpRequest): string;
    private paramsAreEqual;
    private aEntriesPresentInB;
    private callMatchesRequest;
}
export {};
