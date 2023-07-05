import { HttpMethod, TestHttpClientHandler } from '../../../common';

export function mockFftAuthGetTokenCall(testHttpClientController: TestHttpClientHandler) {
  testHttpClientController.expectAlways({
    url: 'fft-auth-url',
    params: {
      key: 'fft-api-key',
    },
    method: HttpMethod.POST,
    resolveTo: {
      idToken: 'foo',
      refreshToken: 'bar',
      expiresIn: '55',
    },
  });
}

export function mockFftAuthGetRefreshTokenCall(testHttpClientController: TestHttpClientHandler) {
  testHttpClientController.expectAlways({
    url: 'fft-refresh-auth-url',
    params: {
      key: 'fft-api-key',
    },
    method: HttpMethod.POST,
    resolveTo: {
      idToken: 'foo',
      refreshToken: 'bar',
      expiresIn: '55',
    },
  });
}
