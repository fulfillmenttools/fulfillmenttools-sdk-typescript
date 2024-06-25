import { ResponseError } from 'superagent';
import { Logger } from 'tslog';
import { FftApiClient } from '../common';
import { CustomLogger } from '../../common';
import { Zone, ZoneForCreation, ZoneForReplacement } from '../types';

export class FftZoneService {
  private readonly PATH = 'zones';

  private readonly logger: Logger<FftZoneService> = new CustomLogger<FftZoneService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(facilityId: string, name: string, score: number): Promise<Zone> {
    const zoneForCreation: ZoneForCreation = {
      name: name,
      score: score,
    };
    try {
      return await this.apiClient.post<Zone>(`facilities/${facilityId}/${this.PATH}`, { ...zoneForCreation });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not create zone. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async getAll(facilityId: string, size = 25): Promise<Zone[]> {
    try {
      return await this.apiClient.get<Zone[]>(`facilities/${facilityId}/${this.PATH}`, {
        ...(size && { size: size.toString() }),
      });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get zones. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async get(facilityId: string, zoneId: string): Promise<Zone> {
    try {
      return await this.apiClient.get<Zone>(`facilities/${facilityId}/${this.PATH}/${zoneId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not get zone ${zoneId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async update(facilityId: string, zoneId: string, name: string, score: number): Promise<Zone> {
    try {
      const zone = await this.get(facilityId, zoneId);
      const zoneForReplacement: ZoneForReplacement = {
        name: name,
        score: score,
        version: zone.version,
      };
      return await this.apiClient.put<Zone>(`facilities/${facilityId}/${this.PATH}/${zoneId}`, {
        ...zoneForReplacement,
      });
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not update zone ${zoneId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }

  public async delete(facilityId: string, zoneId: string): Promise<void> {
    try {
      return await this.apiClient.delete<void>(`facilities/${facilityId}/${this.PATH}/${zoneId}`);
    } catch (error) {
      const httpError = error as ResponseError;
      this.logger.error(
        `Could not delete zone ${zoneId}. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw error;
    }
  }
}
