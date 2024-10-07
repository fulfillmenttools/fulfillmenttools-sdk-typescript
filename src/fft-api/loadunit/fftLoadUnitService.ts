import { FftApiClient } from '../common';
import { LoadUnit, LoadUnits } from '../types';
import { ResponseError } from 'superagent';

export class FftLoadUnitService {
  private readonly path = 'loadunits';

  constructor(private readonly apiClient: FftApiClient) {}

  public async findByPickJobRef(pickJobRef: string): Promise<LoadUnit[]> {
    try {
      const loadunits = await this.apiClient.get<LoadUnits>(this.path, { pickJobRef });
      return loadunits.loadUnits || [];
    } catch (err) {
      const httpError = err as ResponseError;
      console.error(
        `Could not get load units for pickjob id '${pickJobRef}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}
