import { DecisionLog, RoutingPlan, RoutingPlans } from '../types';
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

  public async getById(routingPlanId: string): Promise<RoutingPlan> {
    try {
      return await this.apiClient.get<RoutingPlan>(`${this.path}/${routingPlanId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get routing plan for ID '${routingPlanId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }

  public async getDecisionLogForRoutingPlan(routingPlanId: string, routingRun = 1): Promise<DecisionLog> {
    try {
      return await this.apiClient.get<DecisionLog>(`${this.path}/${routingPlanId}/decisionlogs/${routingRun}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get decision log for routing plan '${routingPlanId}'. Failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );
      throw err;
    }
  }
}
