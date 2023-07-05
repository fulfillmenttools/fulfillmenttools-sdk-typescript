import { Logger } from 'tslog';
import { FftApiClient } from '../common';
import { CustomLogger } from '../../common';
import { Subscription, SubscriptionForCreation, Subscriptions } from '../types';

export class FftSubscriptionService {
  private readonly PATH = 'subscriptions';

  private readonly logger: Logger<FftSubscriptionService> = new CustomLogger<FftSubscriptionService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getSubscriptions(size = 25): Promise<Subscriptions> {
    try {
      return await this.apiClient.get<Subscriptions>(this.PATH, { ...(size && { size: size.toString() }) });
    } catch (err) {
      this.logger.error(`Getting FFT Subscriptions failed: ${err}`);
      throw err;
    }
  }

  public async createSubscription(subscriptionForCreation: SubscriptionForCreation): Promise<Subscription> {
    try {
      return await this.apiClient.post<Subscription>(this.PATH, { ...subscriptionForCreation });
    } catch (err) {
      this.logger.error(`Creating FFT Subscription '${subscriptionForCreation.name}' failed: ${err}`);
      throw err;
    }
  }

  public async deleteSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.PATH}/${subscriptionId}`);
    } catch (err) {
      this.logger.error(`Deleting FFT Subscription '${subscriptionId}' failed: ${err}`);
      throw err;
    }
  }
}
