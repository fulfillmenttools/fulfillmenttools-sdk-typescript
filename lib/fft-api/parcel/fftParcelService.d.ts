import { Parcel } from '../types';
import { FftApiClient } from '../common';
export declare class FftParcelService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    findById(parcelId: string): Promise<Parcel>;
    findMultiple(ids: string[]): Promise<Parcel[]>;
}
