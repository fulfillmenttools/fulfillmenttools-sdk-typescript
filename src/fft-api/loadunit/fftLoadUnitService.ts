import { Logger } from 'tslog';

import { FftApiClient } from '../common';
import { CustomLogger } from '../../common';
import { LoadUnit, LoadUnits } from '../types';
import { ResponseError } from 'superagent';

export class FftLoadUnitService {
  private readonly path = 'loadunits';
  private readonly logger: Logger<FftLoadUnitService> = new CustomLogger<FftLoadUnitService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async findByPickJobRef(pickJobRef: string): Promise<LoadUnit[]> {
    try {
      const loadunits = await this.apiClient.get<LoadUnits>(this.path, { pickJobRef });
      return loadunits.loadUnits || [];
    } catch (err) {
      const httpError = err as ResponseError;
      this.logger.error(
        `Could not get load units for pickjob id '${pickJobRef}'. Failed with status ${httpError.status}, error: ${
          httpError.response ? JSON.stringify(httpError.response.body) : ''
        }`
      );

      throw err;
    }
  }
}
