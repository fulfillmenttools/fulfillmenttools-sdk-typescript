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
      this.logger.error(`FFT Checkoutoptions Earliest POST failed.`, err);
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
      this.logger.error(`FFT Checkoutoptions TimePeriod POST failed.`, err);
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
      this.logger.error(`FFT Checkoutoptions TimePoint POST failed.`, err);
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
      this.logger.error(`FFT CheckoutOptions POST failed.`, err);
      throw err;
    }
  }
}
