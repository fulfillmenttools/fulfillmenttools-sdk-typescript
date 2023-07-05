import { Facility, FacilityForCreation, FacilityStockConfiguration, ModifyFacilityAction, PickingTimes, StrippedFacility } from '../types';
import { FftApiClient } from '../common';
export declare class FftFacilityService {
    private readonly apiClient;
    private static readonly facilityCache;
    private readonly PATH;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    getFacilityId(tenantFacilityId: string): Promise<string>;
    createFacility(facilityForCreation: FacilityForCreation): Promise<Facility>;
    setCarrierForFacility(facilityId: string, carrierRef: string): Promise<void>;
    deleteFacility(tenantFacilityId: string, realDelete?: boolean): Promise<string | undefined>;
    getFacility(facilityId: string): Promise<Facility>;
    getStrippedFacility(tenantFacilityId: string): Promise<StrippedFacility>;
    updateFacility(facilityId: string, action: ModifyFacilityAction): Promise<Facility>;
    private getFacilityStockConfiguration;
    private updateFacilityStockConfiguration;
    disableShortPick(facilityId: string, retries?: number, delay?: number): Promise<FacilityStockConfiguration>;
    getDefaultPickingTimes(): Promise<PickingTimes | undefined>;
    private getCarrierName;
}
