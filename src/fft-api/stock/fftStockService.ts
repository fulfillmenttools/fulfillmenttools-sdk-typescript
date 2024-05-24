import { Logger } from 'tslog';
import { FftApiClient } from '../common';
import {
  FacilityServiceType,
  FacilityStatus,
  Stock,
  StockDistribution,
  StockForCreation,
  StockForUpdate,
  StockPaginatedResult,
  StocksForUpsert,
  StockSummaries,
  StockUpsertOperationResult,
} from '../types';
import { CustomLogger, QueryParams } from '../../common';
import { ResponseError } from 'superagent';

export class FftStockService {
  private readonly path: string = 'stocks';
  private readonly logger: Logger<FftStockService> = new CustomLogger<FftStockService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async createStock(stockForCreation: StockForCreation): Promise<Stock> {
    try {
      return await this.apiClient.post<Stock>(this.path, { ...stockForCreation });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not create stock. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

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
        queryParams['facilityRefs'] = facilityRef;
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, 499);
        queryParams['tenantArticleIds'] = tenantArticleIds;
      }

      if (locationRefs) {
        locationRefs = locationRefs.slice(0, 499);
        queryParams['locationRefs'] = locationRefs;
      }

      if (size && size <= 100) {
        queryParams['size'] = size.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }

      return await this.apiClient.get<StockPaginatedResult>(this.path, queryParams);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Fetching all stock failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }

  public async upsertStocks(stocksForUpsert: StocksForUpsert): Promise<StockUpsertOperationResult> {
    try {
      return await this.apiClient.put<StockUpsertOperationResult>(this.path, { ...stocksForUpsert });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not upsert stock. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }

  public async updateById(stockId: string, stockForUpdate: StockForUpdate): Promise<Stock> {
    try {
      return await this.apiClient.put<Stock>(`${this.path}/${stockId}`, { ...stockForUpdate });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not update stock. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }

  public async deleteById(stockId: string): Promise<void> {
    try {
      return await this.apiClient.delete(`${this.path}/${stockId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not delete stock with id ${stockId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }

  public async getById(stockId: string): Promise<Stock> {
    try {
      return await this.apiClient.get<Stock>(`${this.path}/${stockId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get stock with id '${stockId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }

  public async getStockSummaries(
    size?: number,
    startAfterId?: string,
    serviceTypes?: FacilityServiceType[],
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

      if (serviceTypes && serviceTypes.length > 0) {
        queryParams['serviceTypes'] = serviceTypes;
      }

      if (facilityStatuses) {
        queryParams['facilityStatus'] = facilityStatuses;
      }

      if (facilityRefs) {
        facilityRefs = facilityRefs.slice(0, 499);
        queryParams['facilityRefs'] = facilityRefs;
      }

      if (allowStale) {
        queryParams['allowStale'] = String(allowStale);
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, 499);
        queryParams['tenantArticleIds'] = tenantArticleIds;
      }

      if (channelRefs) {
        channelRefs = channelRefs.slice(0, 49);
        queryParams['channelRefs'] = channelRefs;
      }
      return await this.apiClient.get<StockSummaries>(`${this.path}/summaries`, queryParams);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Fetching stock summaries failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

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
      throw new Error('tenantArticleId is missing.');
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
        facilityIds = facilityIds.slice(0, 499);
        queryParams['facilityIds'] = facilityIds;
      }

      if (channelRefs) {
        channelRefs = channelRefs.slice(0, 49);
        queryParams['channelRefs'] = channelRefs;
      }

      return await this.apiClient.get<StockDistribution>(`articles/${tenantArticleId}/stockdistribution`, queryParams);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Fetching stock distribution for tenantArticleId ${tenantArticleId} failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );

      throw error;
    }
  }
}
