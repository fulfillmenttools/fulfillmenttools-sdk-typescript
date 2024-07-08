import { Logger } from 'tslog';

import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import { SupportedEvents, SupportedLocales } from '../types';

export class FftProjectService {
  private readonly logger: Logger<FftProjectService> = new CustomLogger<FftProjectService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async getSupportedLocales(): Promise<string[]> {
    return await this.apiClient.get<SupportedLocales>('configurations/supportedlocales');
  }

  public async getSupportedEvents(): Promise<string[]> {
    const events = await this.apiClient.get<SupportedEvents>('supportedevents');
    if (events.supportedEvents === undefined || events.supportedEvents.length === 0) {
      return [];
    }
    return events.supportedEvents
      .map((event) => event.event)
      .filter((event) => event !== undefined && event.length > 0) as string[];
  }
}
