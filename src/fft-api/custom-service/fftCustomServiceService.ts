import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import {
  CustomService,
  CustomServiceForCreation,
  FacilityCustomServiceConnection,
  FacilityCustomServiceConnectionForCreation,
  FacilityCustomServiceConnectionForUpdate,
  ModifyCustomServiceAction,
  StrippedCustomServices,
  StrippedFacilityCustomServiceConnections,
} from '../types';

export class FftCustomServiceService {
  private readonly path = 'customservices';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async create(customServiceForCreation: CustomServiceForCreation): Promise<CustomService> {
    try {
      return await this.apiClient.post<CustomService>(`${this.path}`, { ...customServiceForCreation });
    } catch (err) {
      this.log.error(`Could not create custom service.`, err);
      throw err;
    }
  }

  public async getById(customServiceId: string): Promise<CustomService> {
    try {
      return await this.apiClient.get<CustomService>(`${this.path}/${customServiceId}`);
    } catch (err) {
      this.log.error(`Could not get custom service ${customServiceId}.`, err);
      throw err;
    }
  }

  public async update(customServiceId: string, action: ModifyCustomServiceAction): Promise<CustomService> {
    try {
      action.action = ModifyCustomServiceAction.ActionEnum.ModifyCustomService;
      const customService = await this.getById(customServiceId);
      const actions = {
        actions: [action],
        version: customService?.version,
      };
      return await this.apiClient.patch<CustomService>(`${this.path}/${customServiceId}`, {
        ...actions,
      });
    } catch (err) {
      this.log.error(`Could not update custom service ${customServiceId}.`, err);
      throw err;
    }
  }

  public async getAll(
    tenantCustomServiceId?: string,
    size = 25,
    startAfterId?: string
  ): Promise<StrippedCustomServices> {
    try {
      return await this.apiClient.get<StrippedCustomServices>(`${this.path}`, {
        ...(tenantCustomServiceId && { tenantCustomServiceId }),
        ...(size && { size: size.toString() }),
        ...(startAfterId && { startAfterId }),
      });
    } catch (err) {
      this.log.error(`Could not get custom services.`, err);
      throw err;
    }
  }

  public async getFacilityCustomServiceConnections(
    facilityId: string,
    size = 25,
    startAfterId?: string
  ): Promise<StrippedFacilityCustomServiceConnections> {
    try {
      return await this.apiClient.get<StrippedFacilityCustomServiceConnections>(
        `facilities/${facilityId}/${this.path}`,
        {
          ...(size && { size: size.toString() }),
          ...(startAfterId && { startAfterId }),
        }
      );
    } catch (err) {
      this.log.error(`Could not get custom service connections for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async createFacilityCustomServiceConnection(
    facilityId: string,
    customServiceId: string,
    facilityCustomServiceConnection: FacilityCustomServiceConnectionForCreation
  ): Promise<FacilityCustomServiceConnection> {
    try {
      return await this.apiClient.post<FacilityCustomServiceConnection>(
        `facilities/${facilityId}/${this.path}/${customServiceId}`,
        { ...facilityCustomServiceConnection }
      );
    } catch (err) {
      this.log.error(
        `Could not create custom service connection for service ${customServiceId} and facility ${facilityId}.`,
        err
      );
      throw err;
    }
  }

  public async getFacilityCustomServiceConnection(
    facilityId: string,
    customServiceId: string
  ): Promise<FacilityCustomServiceConnection> {
    try {
      return await this.apiClient.get<FacilityCustomServiceConnection>(
        `facilities/${facilityId}/${this.path}/${customServiceId}`
      );
    } catch (err) {
      this.log.error(
        `Could not get custom service connection for service ${customServiceId} and facility ${facilityId}.`,
        err
      );
      throw err;
    }
  }

  public async updateFacilityCustomServiceConnection(
    facilityId: string,
    customServiceId: string,
    facilityCustomServiceConnection: FacilityCustomServiceConnectionForUpdate
  ): Promise<FacilityCustomServiceConnection> {
    try {
      return await this.apiClient.patch<FacilityCustomServiceConnection>(
        `facilities/${facilityId}/${this.path}/${customServiceId}`,
        { ...facilityCustomServiceConnection }
      );
    } catch (err) {
      this.log.error(
        `Could not update custom service connection for service ${customServiceId} and facility ${facilityId}.`,
        err
      );
      throw err;
    }
  }

  public async deleteFacilityCustomServiceConnection(facilityId: string, customServiceId: string): Promise<null> {
    try {
      return await this.apiClient.delete<null>(`facilities/${facilityId}/${this.path}/${customServiceId}`);
    } catch (err) {
      this.log.error(
        `Could not delete custom service connection for service ${customServiceId} and facility ${facilityId}.`,
        err
      );
      throw err;
    }
  }
}
