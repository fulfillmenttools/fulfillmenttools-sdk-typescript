import { isDate } from 'date-fns';
import {
  AbstractModificationAction,
  PickJob,
  PickJobAbortActionEnum,
  PickJobObsoleteActionEnum,
  PickJobResetActionEnum,
  PickJobRestartActionEnum,
  StrippedPickJobs,
} from '../types';
import { FftApiClient } from '../common';
import { ResponseError } from 'superagent';
import { CustomLogger, QueryParams } from '../../common';
import { Logger } from 'tslog';

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
}
