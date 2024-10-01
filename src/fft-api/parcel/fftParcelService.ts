import { ResponseError } from 'superagent';
import { Parcel } from '../types';
import { FftApiClient } from '../common';
import { ResponseType } from '../../common/httpClient/models';
import { LabelDocument } from './labelDocument';

export class FftParcelService {
  private readonly path = 'parcels';
  constructor(private readonly apiClient: FftApiClient) {}

  public async findById(parcelId: string): Promise<Parcel> {
    try {
      return await this.apiClient.get<Parcel>(`${this.path}/${parcelId}`);
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get parcel with id '${parcelId}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }

  public async findMultiple(ids: string[]): Promise<Parcel[]> {
    return await Promise.all(ids.map(async (i) => await this.findById(i)));
  }

  public async getLabel(parcelId: string, labelDocument: LabelDocument): Promise<Buffer> {
    try {
      return await this.apiClient.get<Buffer>(
        `${this.path}/${parcelId}/labels/${labelDocument}`,
        undefined,
        ResponseType.BLOB
      );
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get label ${labelDocument} for parcel with id '${parcelId}'. Failed with status ${
          httpError.status
        }, error: ${httpError.response ? JSON.stringify(httpError.response.body) : ''}`
      );

      throw err;
    }
  }
}
