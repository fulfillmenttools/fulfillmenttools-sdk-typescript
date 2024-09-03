import { Logger } from 'tslog';

import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import { Carrier, CarrierConfiguration, StrippedCarriers } from '../types';

export class FftCarrierService {
  private readonly path = 'carriers';
  private readonly logger: Logger<FftCarrierService> = new CustomLogger<FftCarrierService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getAll(): Promise<StrippedCarriers> {
    return await this.apiClient.get<StrippedCarriers>(this.path);
  }

  public async get(carrierId: string): Promise<Carrier> {
    return await this.apiClient.get<Carrier>(`${this.path}/${carrierId}`);
  }

  public async getConfiguration(carrierId: string): Promise<CarrierConfiguration> {
    return await this.apiClient.get<CarrierConfiguration>(`${this.path}/${carrierId}/configuration`);
  }
}
