import { Logger } from 'tslog';

import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import { LoadUnit, LoadUnits } from '../types';

export class FftLoadUnitService {
  private readonly path = 'loadunits';
  private readonly logger: Logger<FftLoadUnitService> = new CustomLogger<FftLoadUnitService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async findByPickJobRef(pickJobRef: string): Promise<LoadUnit[]> {
    try {
      const loadunits = await this.apiClient.get<LoadUnits>(this.path, { pickJobRef });
      return loadunits.loadUnits || [];
    } catch (err) {
      this.logger.error(`Could not get load units for pickjob id '${pickJobRef}'.`, err);
      throw err;
    }
  }
}
