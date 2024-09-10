import { Logger } from 'tslog';
import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import { DecisionLog, RoutingPlan, RoutingPlans } from '../types';

export class FftRoutingPlanService {
  private readonly path = 'routingplans';
  private readonly logger: Logger<FftRoutingPlanService> = new CustomLogger<FftRoutingPlanService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getByOrderRef(orderRef: string): Promise<RoutingPlans> {
    try {
      return await this.apiClient.get<RoutingPlans>(this.path, { orderRef });
    } catch (err) {
      this.logger.error(`Could not get routing plans for order ref '${orderRef}'.`, err);
      throw err;
    }
  }

  public async getById(routingPlanId: string): Promise<RoutingPlan> {
    try {
      return await this.apiClient.get<RoutingPlan>(`${this.path}/${routingPlanId}`);
    } catch (err) {
      this.logger.error(`Could not get routing plan for ID '${routingPlanId}'.`, err);
      throw err;
    }
  }

  public async getDecisionLogForRoutingPlan(routingPlanId: string, routingRun = 1): Promise<DecisionLog> {
    try {
      return await this.apiClient.get<DecisionLog>(`${this.path}/${routingPlanId}/decisionlogs/${routingRun}`);
    } catch (err) {
      this.logger.error(`Could not get decision log for routing plan '${routingPlanId}'.`, err);
      throw err;
    }
  }
}
