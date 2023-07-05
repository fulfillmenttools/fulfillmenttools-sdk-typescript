import { FftApiClient } from '../common';
import { Subscription, SubscriptionForCreation, Subscriptions } from '../types';
export declare class FftSubscriptionService {
    private readonly apiClient;
    private readonly PATH;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    getSubscriptions(size?: number): Promise<Subscriptions>;
    createSubscription(subscriptionForCreation: SubscriptionForCreation): Promise<Subscription>;
    deleteSubscription(subscriptionId: string): Promise<void>;
}
