import { ResponseError } from 'superagent';
import { Shipment } from '../types';
import { FftApiClient } from '../common';
import { Logger } from 'tslog';
import { CustomLogger } from '../../common';

export class FftShipmentService {
  private readonly path = 'shipments';
  private readonly logger: Logger<FftShipmentService> = new CustomLogger<FftShipmentService>();
  constructor(private readonly apiClient: FftApiClient) {}

  public async findById(shipmentId: string): Promise<Shipment> {
    try {
      return await this.apiClient.get<Shipment>(`${this.path}/${shipmentId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get shipment with id '${shipmentId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}
