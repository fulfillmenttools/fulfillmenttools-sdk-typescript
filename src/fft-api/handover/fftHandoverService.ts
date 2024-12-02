import { FftApiClient } from '../common';
import {
  HandoverJobCancelActionEnum,
  HandoverJobCancelReason,
  Handoverjob,
  HandoverjobPatchActions,
  HandoverjobStatus,
  ModifyHandoverjobAction,
  StrippedHandoverjobs,
} from '../types';
import ActionEnum = ModifyHandoverjobAction.ActionEnum;
import { Logger } from '../../common/utils/logger';

export class FftHandoverService {
  private readonly path = 'handoverjobs';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async findByPickJobRef(pickJobId: string): Promise<StrippedHandoverjobs> {
    try {
      return await this.apiClient.get<StrippedHandoverjobs>(this.path, {
        pickJobRef: pickJobId,
      });
    } catch (err) {
      this.log.error(`Could not get handover jobs for pickjob id '${pickJobId}'`, err);
      throw err;
    }
  }

  public async findById(handoverJobId: string): Promise<Handoverjob> {
    try {
      return await this.apiClient.get<Handoverjob>(`${this.path}/${handoverJobId}`);
    } catch (err) {
      this.log.error(`Could not get handover job with id '${handoverJobId}'`, err);
      throw err;
    }
  }

  public async markAsHandedOver(handoverJobId: string, handoverJobVersion: number) {
    const patchObject: HandoverjobPatchActions = {
      version: handoverJobVersion,
      actions: [
        {
          action: ActionEnum.ModifyHandoverjob,
          status: HandoverjobStatus.HANDEDOVER,
        },
      ],
    };

    try {
      return await this.apiClient.patch<Handoverjob>(`${this.path}/${handoverJobId}`, { ...patchObject });
    } catch (err) {
      this.log.error(`Could not mark handover job with id '${handoverJobId}' as delivered.`, err);
      throw err;
    }
  }

  public async cancel(handoverJobId: string, version: number, reason: HandoverJobCancelReason): Promise<Handoverjob> {
    try {
      const handoverJob = await this.apiClient.post<Handoverjob>(`${this.path}/${handoverJobId}/actions`, {
        name: HandoverJobCancelActionEnum.CANCEL,
        version,
        payload: {
          handoverJobCancelReason: reason,
        },
      });

      return handoverJob;
    } catch (err) {
      this.log.error(`Could not cancel handover job with id '${handoverJobId}' and version ${version}.`, err);
      throw err;
    }
  }
}
