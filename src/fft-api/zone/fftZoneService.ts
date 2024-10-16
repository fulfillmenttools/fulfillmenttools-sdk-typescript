import { FftApiClient } from '../common';
import { Zone, ZoneForCreation, ZoneForReplacement } from '../types';

export class FftZoneService {
  private readonly PATH = 'zones';

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(facilityId: string, name: string, score: number): Promise<Zone> {
    const zoneForCreation: ZoneForCreation = {
      name: name,
      score: score,
    };
    try {
      return await this.apiClient.post<Zone>(`facilities/${facilityId}/${this.PATH}`, { ...zoneForCreation });
    } catch (error) {
      console.error(`Could not create zone for facility ${facilityId}.`, error);
      throw error;
    }
  }

  public async getAll(facilityId: string, size = 25): Promise<Zone[]> {
    try {
      return await this.apiClient.get<Zone[]>(`facilities/${facilityId}/${this.PATH}`, {
        ...(size && { size: size.toString() }),
      });
    } catch (error) {
      console.error(`Could not get zones for facility ${facilityId}.`, error);
      throw error;
    }
  }

  public async get(facilityId: string, zoneId: string): Promise<Zone> {
    try {
      return await this.apiClient.get<Zone>(`facilities/${facilityId}/${this.PATH}/${zoneId}`);
    } catch (error) {
      console.error(`Could not get zone ${zoneId} for facility ${facilityId}.`, error);
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
      console.error(`Could not update zone ${zoneId} for facility ${facilityId}.`, error);
      throw error;
    }
  }

  public async delete(facilityId: string, zoneId: string): Promise<null> {
    try {
      return await this.apiClient.delete<null>(`facilities/${facilityId}/${this.PATH}/${zoneId}`);
    } catch (error) {
      console.error(`Could not delete zone ${zoneId} for facility ${facilityId}.`, error);
      throw error;
    }
  }
}
