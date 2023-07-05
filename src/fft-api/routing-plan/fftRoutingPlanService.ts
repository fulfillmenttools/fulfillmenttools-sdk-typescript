import { RoutingPlans } from '../types';
import { FftApiClient } from '../common';
import { ResponseError } from 'superagent';
import { Logger } from 'tslog';
import { CustomLogger } from '../../common';

export class FftRoutingPlanService {
  private readonly path = 'routingplans';
  private readonly logger: Logger<FftRoutingPlanService> = new CustomLogger<FftRoutingPlanService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getByOrderRef(orderRef: string): Promise<RoutingPlans> {
    try {
      return await this.apiClient.get<RoutingPlans>(this.path, { orderRef });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get routing plans for order ref '${orderRef}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}
