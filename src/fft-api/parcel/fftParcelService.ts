import { Logger } from 'tslog';
import { CustomLogger } from '../../common';
import { ResponseType } from '../../common/httpClient/models';
import { FftApiClient } from '../common';
import { Parcel } from '../types';
import { LabelDocument } from './labelDocument';

export class FftParcelService {
  private readonly path = 'parcels';
  private readonly logger: Logger<FftParcelService> = new CustomLogger<FftParcelService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async findById(parcelId: string): Promise<Parcel> {
    try {
      return await this.apiClient.get<Parcel>(`${this.path}/${parcelId}`);
    } catch (err) {
      this.logger.error(`Could not get parcel with id '${parcelId}'.`, err);
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
      this.logger.error(`Could not get label ${labelDocument} for parcel with id '${parcelId}'.`, err);
      throw err;
    }
  }
}
