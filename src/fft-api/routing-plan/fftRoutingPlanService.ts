import { DecisionLog, RoutingPlan, RoutingPlans } from '../types';
import { FftApiClient } from '../common';
import { Logger } from '../../common/utils/logger';

export class FftRoutingPlanService {
  private readonly path = 'routingplans';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async getByOrderRef(orderRef: string): Promise<RoutingPlans> {
    try {
      return await this.apiClient.get<RoutingPlans>(this.path, { orderRef });
    } catch (err) {
      this.log.error(`Could not get routing plans for order ref '${orderRef}'.`, err);
      throw err;
    }
  }

  public async getById(routingPlanId: string): Promise<RoutingPlan> {
    try {
      return await this.apiClient.get<RoutingPlan>(`${this.path}/${routingPlanId}`);
    } catch (err) {
      this.log.error(`Could not get routing plan for ID '${routingPlanId}'.`, err);
      throw err;
    }
  }

  public async getDecisionLogForRoutingPlan(routingPlanId: string, routingRun = 1): Promise<DecisionLog> {
    try {
      return await this.apiClient.get<DecisionLog>(`${this.path}/${routingPlanId}/decisionlogs/${routingRun}`);
    } catch (err) {
      this.log.error(`Could not get decision log for routing plan '${routingPlanId}'.`, err);
      throw err;
    }
  }
}
