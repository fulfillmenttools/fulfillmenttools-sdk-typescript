import { RoutingPlans } from '../types';
import { FftApiClient } from '../common';
export declare class FftRoutingPlanService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    getByOrderRef(orderRef: string): Promise<RoutingPlans>;
}
