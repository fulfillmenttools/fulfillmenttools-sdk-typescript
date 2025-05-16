import { Logger, QueryParams } from '../../common';
import { FftApiClient } from '../common';
import { AbstractModificationAction, PackJob, PackJobForCreation } from '../types';

export class FftPackJobService {
  private readonly path = 'packjobs';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async create(packJob: PackJobForCreation): Promise<PackJob> {
    try {
      return await this.apiClient.post<PackJob>(`${this.path}`, { ...packJob });
    } catch (err) {
      this.log.error(`Could not create pack job.`, err);
      throw err;
    }
  }

  public async update(packJob: PackJob, actions: AbstractModificationAction[]): Promise<PackJob> {
    try {
      return await this.apiClient.patch<PackJob>(`${this.path}/${packJob.id}`, { version: packJob.version, actions });
    } catch (err) {
      this.log.error(`Could not update pack job with id '${packJob.id}'.`, err);
      throw err;
    }
  }

  public async getById(packJobId: string): Promise<PackJob> {
    try {
      return await this.apiClient.get<PackJob>(`${this.path}/${packJobId}`);
    } catch (err) {
      this.log.error(`Could not get pack job with id '${packJobId}'.`, err);
      throw err;
    }
  }
  public async get(params: QueryParams): Promise<{ packJobs: PackJob[] }> {
    try {
      return await this.apiClient.get<{ packJobs: PackJob[] }>(`${this.path}`, params);
    } catch (err) {
      this.log.error(`Could not get pack jobs.`, err);
      throw err;
    }
  }
}
