import { Logger } from 'tslog';
import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import {
  CheckoutOptionsDeliveryEarliestRequest,
  CheckoutOptionsDeliveryEarliestResponse,
  CheckoutOptionsDeliveryTimePeriodRequest,
  CheckoutOptionsDeliveryTimePeriodResponse,
  CheckoutOptionsDeliveryTimePointRequest,
  CheckoutOptionsDeliveryTimePointResponse,
  CheckoutOptionsInput,
  ResponseForCNCCheckoutOptions,
  ResponseForSFSCheckoutOptions,
} from '../types';
import { ResponseError } from 'superagent';

export class FftOrderPromisingService {
  private readonly path = 'promises/checkoutoptions';
  private readonly logger: Logger<FftOrderPromisingService> = new CustomLogger<FftOrderPromisingService>();
  constructor(private readonly apiClient: FftApiClient) {}

  public async earliestDelivery(
    request: CheckoutOptionsDeliveryEarliestRequest
  ): Promise<CheckoutOptionsDeliveryEarliestResponse> {
    try {
      return await this.apiClient.post<CheckoutOptionsDeliveryEarliestResponse>(`${this.path}/delivery/earliest`, {
        ...request,
      });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT Checkoutoptions Earliest POST failed with status ${httpError.status},  error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async deliveryTimePeriod(
    request: CheckoutOptionsDeliveryTimePeriodRequest
  ): Promise<CheckoutOptionsDeliveryTimePeriodResponse> {
    try {
      return await this.apiClient.post<CheckoutOptionsDeliveryTimePeriodResponse>(`${this.path}/delivery/timeperiod`, {
        ...request,
      });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT Checkoutoptions TimePeriod POST failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async deliveryTimePoint(
    request: CheckoutOptionsDeliveryTimePointRequest
  ): Promise<CheckoutOptionsDeliveryTimePointResponse> {
    try {
      return await this.apiClient.post<CheckoutOptionsDeliveryTimePointResponse>(`${this.path}/delivery/timepoint`, {
        ...request,
      });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT Checkoutoptions TimePoint POST failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async checkoutOptions(
    request: CheckoutOptionsInput
  ): Promise<ResponseForSFSCheckoutOptions | ResponseForCNCCheckoutOptions> {
    try {
      return await this.apiClient.post<ResponseForSFSCheckoutOptions | ResponseForCNCCheckoutOptions>(`${this.path}`, {
        ...request,
      });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT CheckoutOptions POST failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}
