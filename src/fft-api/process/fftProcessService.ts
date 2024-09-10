import { Logger } from 'tslog';
import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import { Process } from '../types';

export class FftProcessService {
  private readonly path = 'processes';
  private readonly logger: Logger<FftProcessService> = new CustomLogger<FftProcessService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getById(processId: string): Promise<Process> {
    try {
      return await this.apiClient.get<Process>(`${this.path}/${processId}`);
    } catch (err) {
      this.logger.error(`Could not get process with id '${processId}'.`, err);
      throw err;
    }
  }
}
