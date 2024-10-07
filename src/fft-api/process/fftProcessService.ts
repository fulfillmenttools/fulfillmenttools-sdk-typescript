import { Process } from '../types';
import { FftApiClient } from '../common';
import { ResponseError } from 'superagent';

export class FftProcessService {
  private readonly path = 'processes';
  constructor(private readonly apiClient: FftApiClient) {}

  public async getById(processId: string): Promise<Process> {
    try {
      return await this.apiClient.get<Process>(`${this.path}/${processId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get process with id '${processId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }
}
