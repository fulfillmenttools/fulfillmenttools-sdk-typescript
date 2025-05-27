import { Parcel } from '../types';
import { FftApiClient } from '../common';
import { LabelDocument } from './labelDocument';
import { ResponseType } from '../../common/httpClient/models';
import { Logger } from '../../common/utils/logger';

export class FftParcelService {
  private readonly path = 'parcels';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async findById(parcelId: string): Promise<Parcel> {
    try {
      return await this.apiClient.get<Parcel>(`${this.path}/${parcelId}`);
    } catch (err) {
      this.log.error(`Could not get parcel with id '${parcelId}'.`, err);
      throw err;
    }
  }

  public async findMultiple(ids: string[]): Promise<Parcel[]> {
    return await Promise.all(ids.map(async (i) => await this.findById(i)));
  }

  public async getLabel(parcelId: string, labelDocument: LabelDocument): Promise<Buffer> {
    try {
      const blob = await this.apiClient.get<Blob>(
        `${this.path}/${parcelId}/labels/${labelDocument}`,
        undefined,
        ResponseType.BLOB
      );
      return Buffer.from(await blob.arrayBuffer());
    } catch (err) {
      this.log.error(`Could not get label ${labelDocument} for parcel with id '${parcelId}'.`, err);
      throw err;
    }
  }
}
