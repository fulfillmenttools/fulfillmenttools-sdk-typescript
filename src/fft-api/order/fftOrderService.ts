import { Logger } from '../../common/utils/logger';
import { FftApiClient } from '../common';
import {
  Order,
  OrderCancelActionParameter,
  OrderForceCancelActionParameter,
  OrderForCreation,
  OrderUnlockActionParameter,
  PromiseConfirmActionParameter,
  PromiseExtendActionParameter,
  ResponseForDeliveryPromise,
  StrippedOrder,
  StrippedOrders,
} from '../types';

export class FftOrderService {
  private readonly path = 'orders';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async create(orderForCreation: OrderForCreation): Promise<Order> {
    try {
      const order = await this.apiClient.post<Order>(`${this.path}`, { ...orderForCreation });
      this.log.debug(
        `Successfully created order with tenantOrderId '${orderForCreation.tenantOrderId}' and order id '${order.id}'`
      );

      return order;
    } catch (err) {
      this.log.error(`FFT Order POST with for tenantOrderId '${orderForCreation.tenantOrderId}'.`, err);
      throw err;
    }
  }

  public async cancel(orderId: string, version: number, shouldForceCancellation = false): Promise<Order> {
    try {
      const order = await this.apiClient.post<Order>(`${this.path}/${orderId}/actions`, {
        name: shouldForceCancellation
          ? OrderForceCancelActionParameter.NameEnum.FORCECANCEL
          : OrderCancelActionParameter.NameEnum.CANCEL,
        version,
      });

      return order;
    } catch (err) {
      this.log.error(`Could not cancel order with id '${orderId}' and version ${version}.`, err);
      throw err;
    }
  }

  public async unlock(orderId: string, version: number): Promise<Order> {
    try {
      const order = await this.apiClient.post<Order>(`${this.path}/${orderId}/actions`, {
        name: OrderUnlockActionParameter.NameEnum.UNLOCK,
        version,
      });

      return order;
    } catch (err) {
      this.log.error(`Could not unlock order with id '${orderId}' and version ${version}.`, err);
      throw err;
    }
  }

  public async createPromise(orderForCreation: OrderForCreation): Promise<ResponseForDeliveryPromise> {
    try {
      return await this.apiClient.post<ResponseForDeliveryPromise>(`promises/deliverypromise`, {
        ...orderForCreation,
      });
    } catch (err) {
      console.error(`Could not create order promise with tenantOrderId '${orderForCreation.tenantOrderId}'.`, err);
      throw err;
    }
  }

  public async confirmPromise(orderId: string, version: number): Promise<Order> {
    try {
      return await this.apiClient.post<Order>(`${this.path}/${orderId}/actions`, {
        name: PromiseConfirmActionParameter.NameEnum.CONFIRMPROMISE,
        version,
      });
    } catch (err) {
      console.error(`Could not confirm order promise with id '${orderId}' and version ${version}.`, err);
      throw err;
    }
  }

  public async extendPromise(orderId: string, version: number): Promise<Order> {
    try {
      return await this.apiClient.post<Order>(`${this.path}/${orderId}/actions`, {
        name: PromiseExtendActionParameter.NameEnum.EXTENDPROMISE,
        version,
      });
    } catch (err) {
      console.error(`Could not extend order promise with id '${orderId}' and version ${version}.`, err);
      throw err;
    }
  }

  public async findBy(orderRef: string): Promise<Order> {
    return this.apiClient.get<Order>(`${this.path}/${orderRef}`);
  }

  public async findByTenantOrderId(tenantOrderId: string): Promise<StrippedOrder | undefined> {
    const strippedOrders = await this.apiClient.get<StrippedOrders>(this.path, {
      tenantOrderId,
    });
    const length = strippedOrders.orders?.length || 0;
    const firstOrder = strippedOrders.orders?.[0];
    if (!firstOrder) {
      return undefined;
    }

    if (length === 1) {
      return firstOrder;
    }

    this.log.warn(
      `Did not find exactly 1 order with tenantOrderId '${tenantOrderId}' but ${length}, returning first one with id '${firstOrder.id}'`
    );
    return firstOrder;
  }
}
