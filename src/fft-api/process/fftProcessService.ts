import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import { Process } from '../types';

export class FftProcessService {
  private readonly path = 'processes';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async getById(processId: string): Promise<Process> {
    try {
      return await this.apiClient.get<Process>(`${this.path}/${processId}`);
    } catch (err) {
      this.log.error(`Could not get process with id '${processId}'.`, err);
      throw err;
    }
  }
}
