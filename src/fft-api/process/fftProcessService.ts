import { Process } from '../types';
import { FftApiClient } from '../common';
import { ResponseError } from 'superagent';
import { CustomLogger } from '../../common';
import { Logger } from 'tslog';

export class FftProcessService {
  private readonly path = 'processes';
  private readonly logger: Logger<FftProcessService> = new CustomLogger<FftProcessService>();
  constructor(private readonly apiClient: FftApiClient) {}

  public async getById(processId: string): Promise<Process> {
    try {
      return await this.apiClient.get<Process>(`${this.path}/${processId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get process with id '${processId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }
}
