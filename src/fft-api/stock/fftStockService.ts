import { ErrorType, FftSdkError, Logger, QueryParams } from '../../common';
import { FftApiClient, MAX_ARRAY_SIZE } from '../common';
import {
  FacilityServiceType,
  FacilityStatus,
  Stock,
  StockActionResult,
  StockDistribution,
  StockForCreation,
  StockForUpdate,
  StockPaginatedResult,
  StocksForUpsert,
  StockSummaries,
  StockUpsertOperationResult,
} from '../types';

export class FftStockService {
  private readonly path: string = 'stocks';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async createStock(stockForCreation: StockForCreation): Promise<Stock> {
    try {
      return await this.apiClient.post<Stock>(this.path, { ...stockForCreation });
    } catch (error) {
      this.log.error(`Could not create stock.`, error);
      throw error;
    }
  }

  public async getAll(
    facilityRef?: string,
    tenantArticleIds?: string[],
    locationRefs?: string[],
    size?: number,
    startAfterId?: string
  ): Promise<StockPaginatedResult> {
    try {
      const queryParams: QueryParams = {};

      if (facilityRef) {
        queryParams['facilityRef'] = facilityRef;
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, MAX_ARRAY_SIZE);
        queryParams['tenantArticleId'] = tenantArticleIds;
      }

      if (locationRefs) {
        locationRefs = locationRefs.slice(0, MAX_ARRAY_SIZE);
        queryParams['locationRef'] = locationRefs;
      }

      if (size && size <= 100) {
        queryParams['size'] = size.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }

      return await this.apiClient.get<StockPaginatedResult>(this.path, queryParams);
    } catch (error) {
      this.log.error(`Fetching all stock failed.`, error);
      throw error;
    }
  }

  public async upsertStocks(stocksForUpsert: StocksForUpsert): Promise<StockUpsertOperationResult> {
    try {
      return await this.apiClient.put<StockUpsertOperationResult>(this.path, { ...stocksForUpsert });
    } catch (error) {
      this.log.error(`Could not upsert stock.`, error);
      throw error;
    }
  }

  public async updateById(stockId: string, stockForUpdate: StockForUpdate): Promise<Stock> {
    try {
      return await this.apiClient.put<Stock>(`${this.path}/${stockId}`, { ...stockForUpdate });
    } catch (error) {
      this.log.error(`Could not update stock ${stockId}.`, error);
      throw error;
    }
  }

  public async deleteById(stockId: string): Promise<void> {
    try {
      return await this.apiClient.delete(`${this.path}/${stockId}`);
    } catch (error) {
      this.log.error(`Could not delete stock with id ${stockId}.`, error);
      throw error;
    }
  }

  public async deleteByIds(stockIds: string[]): Promise<StockActionResult> {
    if (stockIds === undefined || stockIds.length === 0) {
      return {
        name: StockActionResult.NameEnum.DELETEBYIDS,
        result: {
          ids: [],
        },
      };
    }
    if (stockIds) {
      stockIds = stockIds.slice(0, MAX_ARRAY_SIZE);
    }
    const action = {
      action: {
        name: StockActionResult.NameEnum.DELETEBYIDS,
        ids: stockIds,
      },
    };
    try {
      return await this.apiClient.post<StockActionResult>(`${this.path}/actions`, action);
    } catch (error) {
      this.log.error(`Could not delete stocks with ids ${stockIds.join()}.`, error);
      throw error;
    }
  }

  public async deleteByProducts(facilityId: string, tenantArticleIds: string[]): Promise<StockActionResult> {
    if (tenantArticleIds === undefined || tenantArticleIds.length === 0) {
      return {
        name: StockActionResult.NameEnum.DELETEBYPRODUCTS,
        result: {
          ids: [],
        },
      };
    }
    if (tenantArticleIds) {
      tenantArticleIds = tenantArticleIds.slice(0, MAX_ARRAY_SIZE);
    }
    const action = {
      action: {
        name: StockActionResult.NameEnum.DELETEBYPRODUCTS,
        facilityRef: facilityId,
        tenantArticleIds,
      },
    };
    try {
      return await this.apiClient.post<StockActionResult>(`${this.path}/actions`, action);
    } catch (error) {
      this.log.error(`Could not delete stocks in facility ${facilityId} for ${tenantArticleIds.join()}.`, error);
      throw error;
    }
  }

  public async deleteByLocations(locationIds: string[]): Promise<StockActionResult> {
    if (locationIds === undefined || locationIds.length === 0) {
      return {
        name: StockActionResult.NameEnum.DELETEBYLOCATIONS,
        result: {
          ids: [],
        },
      };
    }
    if (locationIds) {
      locationIds = locationIds.slice(0, MAX_ARRAY_SIZE);
    }
    const action = {
      action: {
        name: StockActionResult.NameEnum.DELETEBYLOCATIONS,
        locationRefs: locationIds,
      },
    };
    try {
      return await this.apiClient.post<StockActionResult>(`${this.path}/actions`, action);
    } catch (error) {
      this.log.error(`Could not delete stocks for locations ${locationIds.join()}.`, error);
      throw error;
    }
  }

  public async moveToLocation(
    fromStockId: string,
    toLocationId: string,
    amount: number,
    deleteFromStockIfZero = true
  ): Promise<StockActionResult> {
    const action = {
      action: {
        name: StockActionResult.NameEnum.MOVETOLOCATION,
        fromStockId,
        toLocationRef: toLocationId,
        amount,
        options: {
          deleteFromStockIfZero,
        },
      },
    };
    try {
      return await this.apiClient.post<StockActionResult>(`${this.path}/actions`, action);
    } catch (error) {
      this.log.error(`Could not move stock ${fromStockId} to location ${toLocationId}.`, error);
      throw error;
    }
  }

  public async getById(stockId: string): Promise<Stock> {
    try {
      return await this.apiClient.get<Stock>(`${this.path}/${stockId}`);
    } catch (error) {
      this.log.error(`Could not get stock with id '${stockId}'.`, error);
      throw error;
    }
  }

  public async getStockSummaries(
    size?: number,
    startAfterId?: string,
    facilityServiceTypes?: FacilityServiceType[],
    facilityStatuses?: FacilityStatus[],
    facilityRefs?: string[],
    allowStale?: boolean,
    tenantArticleIds?: string[],
    channelRefs?: string[]
  ): Promise<StockSummaries> {
    try {
      const queryParams: QueryParams = {};

      if (size && size <= 100) {
        queryParams['size'] = size.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }

      if (facilityServiceTypes && facilityServiceTypes.length > 0) {
        queryParams['facilityServiceTypes'] = facilityServiceTypes;
      }

      if (facilityStatuses) {
        queryParams['facilityStatus'] = facilityStatuses;
      }

      if (facilityRefs) {
        facilityRefs = facilityRefs.slice(0, MAX_ARRAY_SIZE);
        queryParams['facilityRefs'] = facilityRefs;
      }

      if (allowStale) {
        queryParams['allowStale'] = String(allowStale);
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, MAX_ARRAY_SIZE);
        queryParams['tenantArticleIds'] = tenantArticleIds;
      }

      if (channelRefs) {
        channelRefs = channelRefs.slice(0, 50);
        queryParams['channelRefs'] = channelRefs;
      }
      return await this.apiClient.get<StockSummaries>(`${this.path}/summaries`, queryParams);
    } catch (error) {
      this.log.error(`Fetching stock summaries failed.`, error);
      throw error;
    }
  }

  public async getStockDistribution(
    tenantArticleId: string,
    facilityServiceTypes?: FacilityServiceType[],
    facilityStatuses?: FacilityStatus[],
    facilityName?: string,
    facilityIds?: string[],
    channelRefs?: string[]
  ): Promise<StockDistribution> {
    if (!tenantArticleId) {
      throw new FftSdkError({ message: 'tenantArticleId is missing.', type: ErrorType.REQUEST });
    }

    try {
      const queryParams: QueryParams = {};

      if (facilityServiceTypes) {
        queryParams['facilityServiceTypes'] = facilityServiceTypes;
      }

      if (facilityStatuses) {
        queryParams['facilityStatus'] = facilityStatuses;
      }

      if (facilityName) {
        queryParams['facilityName'] = facilityName;
      }

      if (facilityIds) {
        facilityIds = facilityIds.slice(0, MAX_ARRAY_SIZE);
        queryParams['facilityIds'] = facilityIds;
      }

      if (channelRefs) {
        channelRefs = channelRefs.slice(0, 49);
        queryParams['channelRefs'] = channelRefs;
      }

      return await this.apiClient.get<StockDistribution>(`articles/${tenantArticleId}/stockdistribution`, queryParams);
    } catch (error) {
      this.log.error(`Fetching stock distribution for tenantArticleId ${tenantArticleId} failed.`, error);
      throw error;
    }
  }
}
