import { ResponseError } from 'superagent';
import { Parcel, ParcelForCreation, Shipment, StrippedShipments } from '../types';
import { FftApiClient } from '../common';

export class FftShipmentService {
  private readonly path = 'shipments';
  constructor(private readonly apiClient: FftApiClient) {}

  public async findById(shipmentId: string): Promise<Shipment> {
    try {
      return await this.apiClient.get<Shipment>(`${this.path}/${shipmentId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get shipment with id '${shipmentId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async findByPickJobId(pickJobRef: string): Promise<StrippedShipments[]> {
    try {
      return await this.apiClient.get<StrippedShipments[]>(`${this.path}`, { pickJobRef });
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get shipments for pickJob '${pickJobRef}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async createParcel(shipmentId: string, parcel: ParcelForCreation): Promise<Parcel> {
    try {
      return await this.apiClient.post<Parcel>(
        `${this.path}/${shipmentId}/parcels`,
        parcel as unknown as Record<string, unknown>
      );
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not create parcel for shipment '${shipmentId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );
      throw err;
    }
  }
}
