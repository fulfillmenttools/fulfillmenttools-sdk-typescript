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

  public async getAll(parameters?: PickJobsQueryParameters): Promise<StrippedPickJobs> {
    try {
      const queryParams: QueryParams = {};

      if (parameters?.searchTerm) {
        queryParams['searchTerm'] = parameters.searchTerm;
      }

      if (parameters?.carrierKeys) {
        parameters.carrierKeys = parameters.carrierKeys.slice(0, MAX_ARRAY_SIZE);
        queryParams['carrierKeys'] = parameters.carrierKeys;
      }

      if (parameters?.startOrderDate) {
        queryParams['startOrderDate'] = parameters.startOrderDate;
      }

      if (parameters?.endOrderDate) {
        queryParams['endOrderDate'] = parameters.endOrderDate;
      }

      if (parameters?.orderRef) {
        queryParams['orderRef'] = parameters.orderRef;
      }

      if (parameters?.facilityRef) {
        queryParams['facilityRef'] = parameters.facilityRef;
      }

      if (parameters?.status) {
        queryParams['status'] = parameters.status;
      }

      if (parameters?.zoneRefs) {
        queryParams['zoneRefs'] = parameters.zoneRefs;
      }

      if (parameters?.tenantOrderId) {
        queryParams['tenantOrderId'] = parameters.tenantOrderId;
      }

      if (parameters?.channel) {
        queryParams['channel'] = parameters.channel;
      }

      if (parameters?.consumerName) {
        queryParams['consumerName'] = parameters.consumerName;
      }

      if (parameters?.shortId) {
        queryParams['shortId'] = parameters.shortId;
      }

      if (parameters?.articleTitle) {
        queryParams['articleTitle'] = parameters.articleTitle;
      }

      if (parameters?.anonymized) {
        queryParams['anonymized'] = parameters.anonymized.toString();
      }

      if (parameters?.startAfterId) {
        queryParams['startAfterId'] = parameters.startAfterId;
      }

      if (parameters?.size) {
        queryParams['size'] = parameters.size.toString();
      }

      if (parameters?.orderBy) {
        queryParams['orderBy'] = parameters.orderBy;
      }

      if (parameters?.startTargetTime) {
        queryParams['startTargetTime'] = parameters.startTargetTime;
      }

      if (parameters?.endTargetTime) {
        queryParams['endTargetTime'] = parameters.endTargetTime;
      }

      if (parameters?.pickJobRefs) {
        queryParams['pickJobRefs'] = parameters.pickJobRefs;
      }

      if (parameters?.modifiedByUsername) {
        queryParams['modifiedByUsername'] = parameters.modifiedByUsername;
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

export interface PickJobsQueryParameters {
  searchTerm?: string;
  carrierKeys?: string[];
  startOrderDate?: string;
  endOrderDate?: string;
  orderRef?: string;
  facilityRef?: string;
  status?: PickJobStatus[];
  zoneRefs?: string[];
  tenantOrderId?: string;
  channel?: ChannelEnum;
  consumerName?: string;
  shortId?: string;
  articleTitle?: string;
  anonymized?: boolean;
  startAfterId?: string;
  size?: number;
  orderBy?: string;
  startTargetTime?: string;
  endTargetTime?: string;
  pickJobRefs?: string[];
  modifiedByUsername?: string;
}
