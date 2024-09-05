import { CustomLogger } from '../../common';
import { Logger } from 'tslog';
import { FftApiClient } from '../common';
import {
  ExternalAction,
  ExternalActionForCreation,
  ExternalActionForReplacement,
  ExternalActionLog,
  ExternalActionLogForCreation,
  ExternalActionLogs,
} from '../types';
import { ResponseError } from 'superagent';

export class FftExternalActionService {
  private readonly path = 'externalactions';
  private readonly logger: Logger<FftExternalActionService> = new CustomLogger<FftExternalActionService>();
  constructor(private readonly apiClient: FftApiClient) {}

  public async create(request: ExternalActionForCreation): Promise<ExternalAction> {
    try {
      return await this.apiClient.post<ExternalAction>(this.path, { ...request });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions POST failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async getById(externalActionId: string): Promise<ExternalAction> {
    try {
      return await this.apiClient.get<ExternalAction>(`${this.path}/${externalActionId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions get id ${externalActionId} failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async createLog(externalActionId: string, logEntry: ExternalActionLogForCreation): Promise<ExternalActionLog> {
    try {
      return await this.apiClient.post<ExternalActionLog>(`${this.path}/${externalActionId}/logs`, { ...logEntry });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions POST Log for ID ${externalActionId} failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async update(externalActionId: string, replacement: ExternalActionForReplacement): Promise<ExternalAction> {
    try {
      return await this.apiClient.put<ExternalAction>(`${this.path}/${externalActionId}`, { ...replacement });
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions PUT replacement for ID ${externalActionId} failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );

      throw err;
    }
  }

  public async delete(externalActionId: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.path}/${externalActionId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions DELETE ID ${externalActionId} failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async getLogsForAction(
    externalActionId: string,
    size?: number,
    startAfterId?: string
  ): Promise<ExternalActionLogs> {
    try {
      const params: Record<string, string> = {};
      if (size) {
        params['size'] = size.toString();
      }

      if (startAfterId) {
        params['startAfterId'] = startAfterId;
      }

      return await this.apiClient.get(`${this.path}/${externalActionId}/logs`, params);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `FFT ExternalActions GET Logs for ID ${externalActionId} failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}