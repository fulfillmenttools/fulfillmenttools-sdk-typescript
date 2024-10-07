import { FftApiClient } from '../common';
import { LoadUnit, LoadUnits } from '../types';

export class FftLoadUnitService {
  private readonly path = 'loadunits';

  constructor(private readonly apiClient: FftApiClient) {}

  public async findByPickJobRef(pickJobRef: string): Promise<LoadUnit[]> {
    try {
      const loadunits = await this.apiClient.get<LoadUnits>(this.path, { pickJobRef });
      return loadunits.loadUnits || [];
    } catch (err) {
      console.error(`Could not get load units for pickjob id '${pickJobRef}'.`, err);
      throw err;
    }
  }
}
