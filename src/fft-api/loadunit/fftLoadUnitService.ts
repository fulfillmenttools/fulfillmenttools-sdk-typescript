import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import { LoadUnit, LoadUnits } from '../types';

export class FftLoadUnitService {
  private readonly path = 'loadunits';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async findByPickJobRef(pickJobRef: string): Promise<LoadUnit[]> {
    try {
      const loadunits = await this.apiClient.get<LoadUnits>(this.path, { pickJobRef });
      return loadunits.loadUnits || [];
    } catch (err) {
      this.log.error(`Could not get load units for pickjob id '${pickJobRef}'.`, err);
      throw err;
    }
  }
}
