"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FftFacilityService = void 0;
const promises_1 = require("timers/promises");
const types_1 = require("../types");
var ActionEnum = types_1.ModifyShortpickAction.ActionEnum;
const common_1 = require("../../common");
class FftFacilityService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.PATH = 'facilities';
        this.logger = new common_1.CustomLogger();
    }
    async getFacilityId(tenantFacilityId) {
        if (FftFacilityService.facilityCache.has(tenantFacilityId)) {
            return FftFacilityService.facilityCache.get(tenantFacilityId);
        }
        const strippedFacilities = await this.apiClient.get(this.PATH, { tenantFacilityId });
        if (!strippedFacilities.facilities?.length) {
            this.logger.error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'`);
            throw new Error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'`);
        }
        if (strippedFacilities.facilities.length > 1) {
            this.logger.warn(`Did not find exactly 1 facility with tenantFacilityId '${tenantFacilityId}' but ${strippedFacilities.facilities.length}, returning first one with id '${strippedFacilities.facilities[0].id}'`);
        }
        const [facility] = strippedFacilities.facilities;
        FftFacilityService.facilityCache.set(tenantFacilityId, facility.id);
        return facility.id;
    }
    async createFacility(facilityForCreation) {
        try {
            return await this.apiClient.post(this.PATH, facilityForCreation);
        }
        catch (err) {
            this.logger.error(`Creating FFT Facility from CT Channel '${facilityForCreation.tenantFacilityId}' failed: ${err}`);
            throw err;
        }
    }
    async setCarrierForFacility(facilityId, carrierRef) {
        const data = {
            name: this.getCarrierName(),
            status: types_1.CarrierStatus.ACTIVE,
            cutoffTime: {
                hour: 12,
                minute: 0,
            },
        };
        try {
            const facilityCarrierConnection = await this.apiClient.post(`${this.PATH}/${facilityId}/carriers/${carrierRef}`, { ...data });
            this.logger.info(`Successfully connected FFT Facility '${facilityId}' with Carrier '${facilityCarrierConnection.key}' '${carrierRef}'`);
        }
        catch (err) {
            this.logger.error(`Connecting FFT Facility '${facilityId}' with Carrier '${carrierRef}' failed with status  error: ${err}`);
            throw err;
        }
    }
    async deleteFacility(tenantFacilityId, realDelete = false) {
        if (tenantFacilityId === undefined) {
            return undefined;
        }
        let facilityId = '';
        try {
            const existingFacility = await this.getStrippedFacility(tenantFacilityId);
            if (existingFacility === undefined) {
                return undefined;
            }
            facilityId = existingFacility.id;
            const data = {
                version: existingFacility.version,
                actions: [
                    {
                        action: types_1.ModifyFacilityAction.ActionEnum.ModifyFacility,
                        status: types_1.ModifyFacilityAction.StatusEnum.OFFLINE,
                    },
                ],
            };
            const facility = await this.apiClient.patch(`${this.PATH}/${facilityId}`, { ...data });
            facilityId = facility.id;
            if (realDelete) {
                this.logger.warn(`Deleting FFT Facility '${facilityId}' for CT Channel '${tenantFacilityId}'`);
                await this.apiClient.delete(`${this.PATH}/${facilityId}`);
                FftFacilityService.facilityCache.delete(tenantFacilityId);
            }
            else {
                this.logger.info(`Not deleting FFT Facility '${facilityId}' for CT Channel '${tenantFacilityId}' because functionality is disabled`);
            }
            return facility.id;
        }
        catch (err) {
            this.logger.error(`Deleting FFT Facility '${facilityId}' from CT Channel '${tenantFacilityId}' failed: ${err}`);
            throw err;
        }
    }
    async getFacility(facilityId) {
        const facility = await this.apiClient.get(this.PATH.concat(`/${facilityId}`));
        if (!facility) {
            this.logger.error(`Did not find facility with facilityId '${facilityId}'`);
            throw new Error(`Did not find facility with facilityId '${facilityId}'`);
        }
        return facility;
    }
    async getStrippedFacility(tenantFacilityId) {
        const strippedFacilities = await this.apiClient.get(this.PATH, { tenantFacilityId });
        if (!strippedFacilities.facilities || strippedFacilities.facilities.length === 0) {
            this.logger.error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'`);
            throw new Error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'`);
        }
        if (strippedFacilities.facilities.length > 1) {
            this.logger.warn(`Did not find exactly 1 facility with tenantFacilityId '${tenantFacilityId}' but ${strippedFacilities.facilities.length}, returning first one with id '${strippedFacilities.facilities[0].id}'`);
        }
        return strippedFacilities.facilities[0];
    }
    async updateFacility(facilityId, action) {
        try {
            let facility = await this.apiClient.get(`${this.PATH}/${facilityId}`);
            const data = {
                version: facility.version,
                actions: [action],
            };
            facility = await this.apiClient.patch(`${this.PATH}/${facilityId}`, { ...data });
            return facility;
        }
        catch (err) {
            this.logger.error(`Updating FFT Facility '${facilityId}' from CT Channel '${action.tenantFacilityId}' failed: ${err}`);
            throw err;
        }
    }
    async getFacilityStockConfiguration(facilityId) {
        return this.apiClient.get(`${this.PATH}/${facilityId}/configurations/stock`);
    }
    async updateFacilityStockConfiguration(facilityId, data) {
        return this.apiClient.patch(`${this.PATH}/${facilityId}/configurations/stock`, {
            ...data,
        });
    }
    async disableShortPick(facilityId, retries = 5, delay = 1000) {
        const action = {
            action: ActionEnum.ModifyShortpick,
            active: false,
        };
        try {
            let facilityStockConfiguration = await this.getFacilityStockConfiguration(facilityId);
            if (facilityStockConfiguration && !facilityStockConfiguration.shortpick.active) {
                this.logger.debug(`ShortPick for Facility ${facilityId} already disabled`);
                return facilityStockConfiguration;
            }
            const data = {
                version: facilityStockConfiguration.version,
                actions: [action],
            };
            facilityStockConfiguration = await this.updateFacilityStockConfiguration(facilityId, data);
            return facilityStockConfiguration;
        }
        catch (err) {
            if (err instanceof Error && retries > 0) {
                this.logger.debug(`No stock configuration for FFT Facility ${facilityId} found. it could be possible that this is a new Facility and the stock configuration is not created yet. will retry in ${delay / 1000} seconds`);
                await (0, promises_1.setTimeout)(delay);
                return this.disableShortPick(facilityId, retries - 1, delay * 2);
            }
            this.logger.error(`Disabling ShortPick for Facility '${facilityId}' failed ${err},`);
            throw err;
        }
    }
    async getDefaultPickingTimes() {
        return (await this.apiClient.get(`configurations/pickingtimes`))?.pickingTimes;
    }
    getCarrierName() {
        return 'IMPLEMENT_ME';
    }
}
exports.FftFacilityService = FftFacilityService;
FftFacilityService.facilityCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZ0RmFjaWxpdHlTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZmdC1hcGkvZmFjaWxpdHkvZmZ0RmFjaWxpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE2QztBQUM3QyxvQ0Fla0I7QUFFbEIsSUFBTyxVQUFVLEdBQUcsNkJBQXFCLENBQUMsVUFBVSxDQUFDO0FBRXJELHlDQUE0QztBQUU1QyxNQUFhLGtCQUFrQjtJQU83QixZQUE2QixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSm5DLFNBQUksR0FBRyxZQUFZLENBQUM7UUFFcEIsV0FBTSxHQUErQixJQUFJLHFCQUFZLEVBQXNCLENBQUM7SUFFdEMsQ0FBQztJQUVqRCxLQUFLLENBQUMsYUFBYSxDQUFDLGdCQUF3QjtRQUNqRCxJQUFJLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUMxRCxPQUFPLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQVcsQ0FBQztTQUN6RTtRQUVELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBcUIsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUN6RyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELGdCQUFnQixHQUFHLENBQUMsQ0FBQztTQUN0RjtRQUVELElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsMERB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