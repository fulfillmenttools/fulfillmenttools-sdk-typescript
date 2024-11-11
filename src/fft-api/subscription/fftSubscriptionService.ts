import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import { Subscription, SubscriptionForCreation, Subscriptions } from '../types';

export class FftSubscriptionService {
  private readonly PATH = 'subscriptions';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async getSubscriptions(size = 25): Promise<Subscriptions> {
    try {
      return await this.apiClient.get<Subscriptions>(this.PATH, { ...(size && { size: size.toString() }) });
    } catch (err) {
      this.log.error(`Getting FFT Subscriptions failed.`, err);
      throw err;
    }
  }

  public async createSubscription(subscriptionForCreation: SubscriptionForCreation): Promise<Subscription> {
    try {
      return await this.apiClient.post<Subscription>(this.PATH, { ...subscriptionForCreation });
    } catch (err) {
      this.log.error(`Creating FFT Subscription '${subscriptionForCreation.name}' failed.`, err);
      throw err;
    }
  }

  public async deleteSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.PATH}/${subscriptionId}`);
    } catch (err) {
      this.log.error(`Deleting FFT Subscription '${subscriptionId}' failed.`, err);
      throw err;
    }
  }
}
