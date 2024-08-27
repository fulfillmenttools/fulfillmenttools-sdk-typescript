import { isDate } from 'date-fns';
import {
  AbstractModificationAction,
  PickJob,
  PickJobAbortActionEnum,
  PickjobDeliveryInformationForCreation,
  PickJobObsoleteActionEnum,
  PickJobResetActionEnum,
  PickJobRestartActionEnum,
  PickJobStatus,
  StrippedPickJobs,
} from '../types';
import { FftApiClient, MAX_ARRAY_SIZE } from '../common';
import { ResponseError } from 'superagent';
import { CustomLogger, QueryParams } from '../../common';
import { Logger } from 'tslog';
import ChannelEnum = PickjobDeliveryInformationForCreation.ChannelEnum;

export class FftPickJobService {
  private readonly path = 'pickjobs';
  private readonly logger: Logger<FftPickJobService> = new CustomLogger<FftPickJobService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getByTenantOrderId(tenantOrderId: string): Promise<StrippedPickJobs> {
    try {
      return await this.apiClient.get<StrippedPickJobs>(this.path, { tenantOrderId });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get pick jobs with tenant order id '${tenantOrderId}'. Failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );

      throw err;
    }
  }

  public async abort(pickJobId: string, version: number): Promise<PickJob> {
    return await this.updateAction(pickJobId, version, PickJobAbortActionEnum.ABORT);
  }

  public async restart(pickJobId: string, version: number): Promise<PickJob> {
    return await this.updateAction(pickJobId, version, PickJobRestartActionEnum.RESTART);
  }

  public async reset(pickJobId: string, version: number): Promise<PickJob> {
    return await this.updateAction(pickJobId, version, PickJobResetActionEnum.RESET);
  }

  public async obsolete(pickJobId: string, version: number): Promise<PickJob> {
    return await this.updateAction(pickJobId, version, PickJobObsoleteActionEnum.OBSOLETE);
  }

  public async updateAction(pickJobId: string, version: number, action: string): Promise<PickJob> {
    try {
      return await this.apiClient.post<PickJob>(`${this.path}/${pickJobId}/actions`, {
        name: action,
        version,
      });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not update pick job with id '${pickJobId}' and version ${version}. Failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );

      throw err;
    }
  }

  public async getById(pickJobId: string): Promise<PickJob> {
    try {
      return await this.apiClient.get<PickJob>(`${this.path}/${pickJobId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get pick job with id '${pickJobId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }

  public async getOpenPickJobsByFacilityRef(
    id: string,
    startTargetTime?: Date,
    endTargetTime?: Date,
    size?: number
  ): Promise<StrippedPickJobs> {
    const params: QueryParams = {
      facilityRef: id,
      status: ['OPEN', 'IN_PROGRESS', 'PICKED', 'PACKABLE'].join(','),
      orderBy: 'TARGET_TIME_DESC',
      ...(size && { size: size.toString() }),
      ...(startTargetTime && isDate(startTargetTime) && { startTargetTime: startTargetTime.toISOString() }),
      ...(endTargetTime && isDate(endTargetTime) && { endTargetTime: endTargetTime.toISOString() }),
    };
    try {
      return await this.apiClient.get<StrippedPickJobs>(this.path, params);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get pick jobs for facility '${id}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }

  public async update(pickJob: PickJob, actions: AbstractModificationAction[]): Promise<PickJob> {
    try {
      return await this.apiClient.patch<PickJob>(`${this.path}/${pickJob.id}`, { version: pickJob.version, actions });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not update pick job with id '${pickJob.id}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async getAll(
    searchTerm?: string,
    carrierKeys?: string[],
    startOrderDate?: string,
    endOrderDate?: string,
    orderRef?: string,
    facilityRef?: string,
    status?: PickJobStatus[],
    zoneRefs?: string[],
    tenantOrderId?: string,
    channel?: ChannelEnum,
    consumerName?: string,
    shortId?: string,
    articleTitle?: string,
    anonymized?: boolean,
    startAfterId?: string,
    size?: number,
    orderBy?: string,
    startTargetTime?: string,
    endTargetTime?: string,
    pickJobRefs?: string[],
    modifiedByUsername?: string
  ): Promise<StrippedPickJobs> {
    try {
      const queryParams: QueryParams = {};

      if (searchTerm) {
        queryParams['searchTerm'] = searchTerm;
      }

      if (carrierKeys) {
        carrierKeys = carrierKeys.slice(0, MAX_ARRAY_SIZE);
        queryParams['carrierKeys'] = carrierKeys;
      }

      if (startOrderDate) {
        queryParams['startOrderDate'] = startOrderDate;
      }

      if (endOrderDate) {
        queryParams['endOrderDate'] = endOrderDate;
      }

      if (orderRef) {
        queryParams['orderRef'] = orderRef;
      }

      if (facilityRef) {
        queryParams['facilityRef'] = facilityRef;
      }

      if (status) {
        queryParams['status'] = status;
      }

      if (zoneRefs) {
        queryParams['zoneRefs'] = zoneRefs;
      }

      if (tenantOrderId) {
        queryParams['tenantOrderId'] = tenantOrderId;
      }

      if (channel) {
        queryParams['channel'] = channel;
      }

      if (consumerName) {
        queryParams['consumerName'] = consumerName;
      }

      if (shortId) {
        queryParams['shortId'] = shortId;
      }

      if (articleTitle) {
        queryParams['articleTitle'] = articleTitle;
      }

      if (anonymized) {
        queryParams['anonymized'] = anonymized.toString();
      }

      if (startAfterId) {
        queryParams['startAfterId'] = startAfterId;
      }

      if (size) {
        queryParams['size'] = size.toString();
      }

      if (orderBy) {
        queryParams['orderBy'] = orderBy;
      }

      if (startTargetTime) {
        queryParams['startTargetTime'] = startTargetTime;
      }

      if (endTargetTime) {
        queryParams['endTargetTime'] = endTargetTime;
      }

      if (pickJobRefs) {
        queryParams['pickJobRefs'] = pickJobRefs;
      }

      if (modifiedByUsername) {
        queryParams['modifiedByUsername'] = modifiedByUsername;
      }

      return await this.apiClient.get<StrippedPickJobs>(this.path, queryParams);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Fetching all pickjobs failed with status code ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw error;
    }
  }
}
