import { HttpMethod, QueryParams } from './models';
interface BasicTestHttpRequest {
  method: HttpMethod;
  url: string;
  params?: QueryParams;
  // TODO: add "expectHeader / expectBody" Property to validate requests without needing a spy
  ignoreParams?: string[];
}

export interface ResolvedTestHttpRequest<Dto = unknown> extends BasicTestHttpRequest {
  resolveTo: Dto;

  /**
   * if empty resolves to HttpStatus 200/OK
   */
  resolveStatusCode?: number;
}

export interface RejectedTestHttpRequest<TError extends Error = Error> extends BasicTestHttpRequest {
  rejectsTo: TError;
}

export type TestHttpRequest = ResolvedTestHttpRequest | RejectedTestHttpRequest;

export class TestHttpClientHandler {
  private readonly expectedCalls: TestHttpRequest[] = [];

  private readonly alwaysExpectedCalls: TestHttpRequest[] = [];

  private readonly notExpectedRequests: TestHttpRequest[] = [];

  private readonly notExpectedRequestsCalled: BasicTestHttpRequest[] = [];

  /**
   * Adds expected calls to the mock list, so that when requested the mocks can be
   * returned by the TestHttpClient
   * @param request
   */
  public expectOne(request: TestHttpRequest) {
    this.expectedCalls.push(request);
  }

  public expectAlways(request: TestHttpRequest) {
    this.alwaysExpectedCalls.push(request);
  }

  public expectNone(request: TestHttpRequest) {
    this.notExpectedRequests.push(request);
  }

  /**
   * Only used internally by TestHttpClient
   * @param request
   */
  public lookupRequest(request: BasicTestHttpRequest) {
    // const combinedUrl = this.generateCombinedUrl(request);
    if (this.notExpectedRequests.some((call) => this.callMatchesRequest(call, request))) {
      this.notExpectedRequestsCalled.push(request);
      return request;
    }
    const alwaysExpectedCallIndex = this.alwaysExpectedCalls.findIndex((call) =>
      this.callMatchesRequest(call, request)
    );

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

  public throwIfNotExpectedCallsWhereMade() {
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

  public throwIfExpectedCallsAreStillPresent() {
    const expectedCallsCopy = [...this.expectedCalls];
    this.expectedCalls.length = 0;
    if (expectedCallsCopy.length > 0) {
      throw new Error(
        `Not all expected http calls have been used. ${expectedCallsCopy
          .map((c) => `${c.method} - ${this.generateCombinedUrl(c)}`)
          .join('; ')}`
      );
    }
  }

  public generateCombinedUrl(request: BasicTestHttpRequest) {
    return request.params
      ? `${request.url}?${Object.entries(request.params)
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join('&')}`
      : request.url;
  }

  private paramsAreEqual(a: QueryParams | undefined, b: QueryParams | undefined, ignoreKeys: string[] | undefined) {
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

  private aEntriesPresentInB(a: QueryParams, b: QueryParams, ignoreKeys: string[] | undefined) {
    let entries = Object.entries(a);
    if (ignoreKeys) {
      entries = entries.filter((entry) => !ignoreKeys.some((key) => entry[0] === key));
    }
    return entries.every((aEntry) =>
      Object.entries(b).some((bEntry) => aEntry[0] === bEntry[0] && aEntry[1] === bEntry[1])
    );
  }

  private callMatchesRequest(call: TestHttpRequest, request: BasicTestHttpRequest) {
    return (
      call.url === request.url &&
      call.method === request.method &&
      this.paramsAreEqual(call.params, request.params, call.ignoreParams)
    );
  }
}
