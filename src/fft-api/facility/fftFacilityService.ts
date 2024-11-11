import { FftApiError, Logger, QueryParams } from '../../common';
import { FftApiClient } from '../common';
import {
  CarrierStatus,
  DefaultPickingTimesConfiguration,
  Facility,
  FacilityCarrierConnection,
  FacilityCarrierConnectionForCreation,
  FacilityForCreation,
  FacilityPatchActions,
  FacilityStockConfiguration,
  ModifyFacilityAction,
  ModifyShortpickAction,
  PickingTimes,
  StockConfigurationPatchActions,
  StrippedFacilities,
  StrippedFacility,
} from '../types';
import ActionEnum = ModifyShortpickAction.ActionEnum;

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class FftFacilityService {
  private static readonly facilityCache = new Map<string, string>();

  private readonly PATH = 'facilities';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async getFacilityId(tenantFacilityId: string, relaxed = false): Promise<string | undefined> {
    this.log.log(`Getting facility ${tenantFacilityId}...`);

    if (FftFacilityService.facilityCache.has(tenantFacilityId)) {
      return FftFacilityService.facilityCache.get(tenantFacilityId) as string;
    }

    const strippedFacilities = await this.apiClient.get<StrippedFacilities>(this.PATH, { tenantFacilityId });
    const length = strippedFacilities.facilities?.length || 0;
    let facility: StrippedFacility;

    if (length >= 1) {
      facility = strippedFacilities.facilities?.[0] as StrippedFacility;
      FftFacilityService.facilityCache.set(tenantFacilityId, facility.id);
      if (length > 1) {
        this.log.warn(
          `Did not find exactly 1 facility with tenantFacilityId '${tenantFacilityId}' but ${length}, returning first one with id '${facility.id}'`
        );
      }
    } else {
      if (relaxed) {
        return undefined;
      } else {
        this.log.error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'`);
        throw new FftApiError({
          message: `Did not find facility with tenantFacilityId '${tenantFacilityId}'`,
        });
      }
    }

    return facility.id;
  }

  public async get(params?: QueryParams): Promise<StrippedFacilities> {
    try {
      this.log.log(`Getting all facilities...`);
      return await this.apiClient.get<StrippedFacilities>(this.PATH, params);
    } catch (err) {
      this.log.error(`Getting all facilities failed.`, err);
      throw err;
    }
  }

  public async createFacility(facilityForCreation: FacilityForCreation): Promise<Facility> {
    try {
      return await this.apiClient.post<Facility>(this.PATH, facilityForCreation);
    } catch (err) {
      this.log.error(`Creating FFT Facility '${facilityForCreation.tenantFacilityId}' failed.`, err);
      throw err;
    }
  }

  public async setCarrierForFacility(facilityId: string, carrierRef: string): Promise<void> {
    const data: FacilityCarrierConnectionForCreation = {
      name: this.getCarrierName(),
      status: CarrierStatus.ACTIVE,
      cutoffTime: {
        hour: 12,
        minute: 0,
      },
    };
    try {
      const facilityCarrierConnection = await this.apiClient.post<FacilityCarrierConnection>(
        `${this.PATH}/${facilityId}/carriers/${carrierRef}`,
        { ...data }
      );
      this.log.debug(
        `Successfully connected FFT Facility '${facilityId}' with Carrier '${facilityCarrierConnection.key}' '${carrierRef}'`
      );
    } catch (err) {
      this.log.error(`Connecting FFT Facility '${facilityId}' with Carrier '${carrierRef}' failed.`, err);
      throw err;
    }
  }

  public async deleteFacility(tenantFacilityId: string, realDelete = false): Promise<string | undefined> {
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

      const data: FacilityPatchActions = {
        version: existingFacility.version,
        actions: [
          {
            action: ModifyFacilityAction.ActionEnum.ModifyFacility,
            status: ModifyFacilityAction.StatusEnum.OFFLINE,
          },
        ],
      };
      const facility = await this.apiClient.patch<Facility>(`${this.PATH}/${facilityId}`, { ...data });
      facilityId = facility.id;

      if (realDelete) {
        this.log.warn(`Deleting FFT Facility '${facilityId}' for CT Channel '${tenantFacilityId}'`);
        await this.apiClient.delete(`${this.PATH}/${facilityId}`);
        FftFacilityService.facilityCache.delete(tenantFacilityId);
      } else {
        this.log.debug(
          `Not deleting FFT Facility '${facilityId}' for CT Channel '${tenantFacilityId}' because functionality is disabled`
        );
      }
      return facility.id;
    } catch (err) {
      this.log.error(`Deleting FFT Facility '${facilityId}' from CT Channel '${tenantFacilityId}' failed.`, err);
      throw err;
    }
  }

  public async getFacility(facilityId: string): Promise<Facility> {
    this.log.log(`Getting facility ${facilityId}...`);
    const facility = await this.apiClient.get<Facility>(this.PATH.concat(`/${facilityId}`));
    if (!facility) {
      this.log.error(`Did not find facility with facilityId '${facilityId}'.`);
      throw new FftApiError({
        message: `Did not find facility with facilityId '${facilityId}'`,
      });
    }
    return facility;
  }

  public async getStrippedFacility(tenantFacilityId: string): Promise<StrippedFacility> {
    const strippedFacilities = await this.apiClient.get<StrippedFacilities>(this.PATH, { tenantFacilityId });
    if (!strippedFacilities.facilities || strippedFacilities.facilities.length === 0) {
      this.log.error(`Did not find facility with tenantFacilityId '${tenantFacilityId}'.`);
      throw new FftApiError({
        message: `Did not find facility with tenantFacilityId '${tenantFacilityId}'`,
      });
    }

    if (strippedFacilities.facilities.length > 1) {
      this.log.warn(
        `Did not find exactly 1 facility with tenantFacilityId '${tenantFacilityId}' but ${strippedFacilities.facilities.length}, returning first one with id '${strippedFacilities.facilities[0].id}'`
      );
    }

    return strippedFacilities.facilities[0];
  }

  public async updateFacility(facilityId: string, action: ModifyFacilityAction): Promise<Facility> {
    try {
      let facility = await this.apiClient.get<Facility>(`${this.PATH}/${facilityId}`);

      const data: FacilityPatchActions = {
        version: facility.version,
        actions: [action],
      };
      facility = await this.apiClient.patch<Facility>(`${this.PATH}/${facilityId}`, { ...data });
      return facility;
    } catch (err) {
      this.log.error(`Updating FFT Facility '${facilityId}' from CT Channel '${action.tenantFacilityId}' failed.`, err);
      throw err;
    }
  }

  private async getFacilityStockConfiguration(facilityId: string): Promise<FacilityStockConfiguration> {
    return this.apiClient.get<FacilityStockConfiguration>(`${this.PATH}/${facilityId}/configurations/stock`);
  }

  private async updateFacilityStockConfiguration(
    facilityId: string,
    data: StockConfigurationPatchActions
  ): Promise<FacilityStockConfiguration> {
    return this.apiClient.patch<FacilityStockConfiguration>(`${this.PATH}/${facilityId}/configurations/stock`, {
      ...data,
    });
  }

  public async disableShortPick(facilityId: string, retries = 5, delay = 1000): Promise<FacilityStockConfiguration> {
    const action: ModifyShortpickAction = {
      action: ActionEnum.ModifyShortpick,
      active: false,
    };

    try {
      let facilityStockConfiguration = await this.getFacilityStockConfiguration(facilityId);
      if (facilityStockConfiguration && !facilityStockConfiguration.shortpick.active) {
        this.log.debug(`ShortPick for Facility ${facilityId} already disabled`);
        return facilityStockConfiguration;
      }
      const data: StockConfigurationPatchActions = {
        version: facilityStockConfiguration.version,
        actions: [action],
      };
      facilityStockConfiguration = await this.updateFacilityStockConfiguration(facilityId, data);
      return facilityStockConfiguration;
    } catch (err) {
      if (err instanceof Error && retries > 0) {
        this.log.debug(
          `No stock configuration for FFT Facility ${facilityId} found. it could be possible that this is a new Facility and the stock configuration is not created yet. will retry in ${
            delay / 1000
          } seconds`
        );
        await sleep(delay);
        return this.disableShortPick(facilityId, retries - 1, delay * 2);
      }
      this.log.error(`Disabling ShortPick for Facility '${facilityId}' failed.`, err);
      throw err;
    }
  }

  public async getDefaultPickingTimes(): Promise<PickingTimes | undefined> {
    return (await this.apiClient.get<DefaultPickingTimesConfiguration>(`configurations/pickingtimes`))?.pickingTimes;
  }

  private getCarrierName(): string {
    return 'IMPLEMENT_ME';
  }
}
