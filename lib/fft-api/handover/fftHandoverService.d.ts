import { Handoverjob, StrippedHandoverjobs } from '../types';
import { FftApiClient } from '../common';
export declare class FftHandoverService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    findByPickJobRef(pickJobId: string): Promise<StrippedHandoverjobs>;
    findById(handoverJobId: string): Promise<Handoverjob>;
    markAsHandedOver(handoverJobId: string, handoverJobVersion: number): Promise<Handoverjob>;
}
