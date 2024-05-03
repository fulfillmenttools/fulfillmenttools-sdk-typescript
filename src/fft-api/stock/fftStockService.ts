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
import { CustomLogger } from '../../common';
import { ResponseError } from 'superagent';

export class FftStockService {
  private readonly path: string = 'stocks';
  private readonly logger: Logger<FftStockService> = new CustomLogger<FftStockService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async createStock(stockForCreation: StockForCreation): Promise<Stock> {
    try {
      return this.apiClient.post<Stock>(this.path, { ...stockForCreation });
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
      const queryParams: Record<string, string> = {};

      if (facilityRef) {
        queryParams['facilityRef'] = facilityRef;
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, 499);

        if (tenantArticleIds.length == 1) {
          queryParams['tenantArticleIds'] = tenantArticleIds[0];
        }

        if (tenantArticleIds.length > 1) {
          let query = `${tenantArticleIds[0]}&tenantArticleIds=`;
          tenantArticleIds = tenantArticleIds.slice(1, 499);
          query += tenantArticleIds.join('&tenantArticleIds=');

          queryParams['tenantArticleIds'] = query;
        }
      }

      if (locationRefs) {
        locationRefs = locationRefs.slice(0, 499);

        if (locationRefs.length == 1) {
          queryParams['locationRefs'] = locationRefs[0];
        }

        if (locationRefs.length > 1) {
          let query = `${locationRefs[0]}&locationRefs=`;
          locationRefs = locationRefs.slice(1, 499);
          query += locationRefs.join('&locationRefs=');

          queryParams['locationRefs'] = query;
        }
      }

      if (size && size <= 100) {
        queryParams['size'] = size.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }
      return this.apiClient.get<StockPaginatedResult>(this.path, queryParams);
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
      return this.apiClient.put<StockUpsertOperationResult>(this.path, { ...stocksForUpsert });
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
      return this.apiClient.put<Stock>(`${this.path}/${stockId}`, { ...stockForUpdate });
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
      return this.apiClient.delete(`${this.path}/${stockId}`);
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
      return this.apiClient.get<Stock>(`${this.path}/${stockId}`);
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
    tenantArticleIds?: string[]
  ): Promise<StockSummaries> {
    try {
      const queryParams: Record<string, string> = {};

      if (size && size <= 100) {
        queryParams['size'] = size.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }

      if (serviceTypes) {
        if (serviceTypes.length == 1) {
          queryParams['facilityServiceTypes'] = serviceTypes[0];
        }

        if (serviceTypes.length > 1) {
          let query = `${serviceTypes[0]}&facilityServiceType=`;
          serviceTypes = serviceTypes.slice(1);
          query += serviceTypes.join('&facilityServiceType=');

          queryParams['facilityServiceType'] = query;
        }
      }

      if (facilityStatuses) {
        if (facilityStatuses.length == 1) {
          queryParams['facilityStatus'] = facilityStatuses[0];
        }

        if (facilityStatuses.length > 1) {
          let query = `${facilityStatuses[0]}&facilityStatus=`;
          facilityStatuses = facilityStatuses.slice(1);
          query += facilityStatuses.join('&facilityServiceType=');

          queryParams['facilityStatus'] = query;
        }
      }

      if (facilityRefs) {
        facilityRefs = facilityRefs.slice(0, 499);

        if (facilityRefs.length == 1) {
          queryParams['facilityRefs'] = facilityRefs[0];
        }

        if (facilityRefs.length > 1) {
          let query = `${facilityRefs[0]}&facilityRefs=`;
          facilityRefs = facilityRefs.slice(1);
          query += facilityRefs.join('&facilityRefs=');

          queryParams['facilityRefs'] = query;
        }
      }

      if (allowStale) {
        queryParams['allowStale'] = String(allowStale);
      }

      if (tenantArticleIds) {
        tenantArticleIds = tenantArticleIds.slice(0, 499);

        if (tenantArticleIds.length == 1) {
          queryParams['tenantArticleId'] = tenantArticleIds[0];
        }

        if (tenantArticleIds.length > 1) {
          let query = `${tenantArticleIds[0]}&tenantArticleId=`;
          tenantArticleIds = tenantArticleIds.slice(1, 499);
          query += tenantArticleIds.join('&tenantArticleId=');

          queryParams['tenantArticleId'] = query;
        }
      }

      return this.apiClient.get<StockSummaries>(this.path, queryParams);
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
      const queryParams: Record<string, string> = {};

      queryParams['tenantArticleId'] = tenantArticleId;

      if (facilityServiceTypes) {
        if (facilityServiceTypes.length == 1) {
          queryParams['facilityServiceTypes'] = facilityServiceTypes.toString();
        }

        if (facilityServiceTypes.length > 1) {
          let query = `${facilityServiceTypes[0]}&facilityServiceTypes=`;
          facilityServiceTypes = facilityServiceTypes.slice(1);
          query += facilityServiceTypes.join('&facilityServiceTypes=');

          queryParams['facilityServiceTypes'] = query;
        }
      }

      if (facilityStatuses) {
        if (facilityStatuses.length == 1) {
          queryParams['facilityStatus'] = facilityStatuses[0].toString();
        }

        if (facilityStatuses.length > 1) {
          let query = `${facilityStatuses[0]}&facilityStatus=`;
          facilityStatuses.slice(1);
          query += facilityServiceTypes?.join('&facilityStatus=');

          queryParams['facilityStatus'] = query;
        }
      }

      if (facilityName) {
        queryParams['facilityName'] = facilityName;
      }

      if (facilityIds) {
        if (facilityIds.length == 1) {
          queryParams['facilityIds'] = facilityIds[0];
        }

        if (facilityIds.length > 1) {
          let query = `${facilityIds[0]}&facilityIds=`;
          facilityIds = facilityIds.slice(1);
          query += facilityIds.join('&facilityIds=');

          queryParams['facilityIds'] = query;
        }
      }

      if (channelRefs) {
        channelRefs = channelRefs.slice(0, 49);

        if (channelRefs.length == 1) {
          queryParams['channelRefs'] = channelRefs[0];
        }

        if (channelRefs.length > 1) {
          let query = `${channelRefs[0]}&channelRefs=`;
          channelRefs = channelRefs.slice(1);
          query += channelRefs.join('&channelRefs=');

          queryParams['channelRefs'] = query;
        }
      }

      return this.apiClient.get<StockDistribution>(this.path);
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
