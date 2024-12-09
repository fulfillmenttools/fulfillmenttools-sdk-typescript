import { ErrorType, FftSdkError, QueryParams } from '../../common';
import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import { Process } from '../types';

export class FftProcessService {
  private readonly path = 'processes';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async getById(processId: string): Promise<Process> {
    try {
      return await this.apiClient.get<Process>(`${this.path}/${processId}`);
    } catch (err) {
      this.log.error(`Could not get process with id '${processId}'.`, err);
      throw err;
    }
  }

  public async get(parameters?: ProcessQueryParameters): Promise<Process> {
    try {
      const queryParams: QueryParams = {};

      if (parameters?.orderRef) {
        queryParams['orderRef'] = parameters.orderRef;
      }

      if (parameters?.tenantOrderId) {
        queryParams['tenantOrderId'] = parameters.tenantOrderId;
      }

      if (parameters?.pickJobRef) {
        queryParams['pickJobRef'] = parameters.pickJobRef;
      }

      if (parameters?.shipmentRef) {
        queryParams['shipmentRef'] = parameters.shipmentRef;
      }

      if (parameters?.handoverJobRef) {
        queryParams['handoverJobRef'] = parameters.handoverJobRef;
      }

      if (parameters?.returnRef) {
        queryParams['returnRef'] = parameters.returnRef;
      }

      if (Object.keys(queryParams).length === 0) {
        throw new FftSdkError({ message: 'At least one query parameter is required.', type: ErrorType.REQUEST });
      }

      return await this.apiClient.get<Process>(this.path, queryParams);
    } catch (err) {
      this.log.error(`Could not get process.`, err);
      throw err;
    }
  }
}

export interface ProcessQueryParameters {
  orderRef?: string;
  tenantOrderId?: string;
  pickJobRef?: string;
  shipmentRef?: string;
  handoverJobRef?: string;
  returnRef?: string;
}
