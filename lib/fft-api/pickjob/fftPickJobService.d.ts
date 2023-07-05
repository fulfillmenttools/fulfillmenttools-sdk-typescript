import { PickJob, StrippedPickJobs } from '../types';
import { FftApiClient } from '../common';
export declare class FftPickJobService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    getByTenantOrderId(tenantOrderId: string): Promise<StrippedPickJobs>;
    abort(pickJobId: string, version: number): Promise<PickJob>;
    getById(pickJobId: string): Promise<PickJob>;
    getOpenPickJobsByFacilityRef(id: string, startTargetTime?: Date, endTargetTime?: Date, size?: number): Promise<StrippedPickJobs>;
}
