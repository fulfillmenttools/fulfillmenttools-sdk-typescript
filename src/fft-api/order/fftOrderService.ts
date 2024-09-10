import { Logger } from 'tslog';
import { CustomLogger } from '../../common';
import { FftApiClient } from '../common';
import {
  Order,
  OrderCancelActionParameter,
  OrderForCreation,
  OrderUnlockActionParameter,
  StrippedOrder,
  StrippedOrders,
} from '../types';

export class FftOrderService {
  private readonly path = 'orders';
  private readonly logger: Logger<FftOrderService> = new CustomLogger<FftOrderService>();

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(orderForCreation: OrderForCreation): Promise<Order> {
    try {
      const order = await this.apiClient.post<Order>(`${this.path}`, { ...orderForCreation });
      this.logger.debug(
        `Successfully created order with tenantOrderId '${orderForCreation.tenantOrderId}' and order id '${order.id}'`
      );

      return order;
    } catch (err) {
      this.logger.error(`FFT Order POST with for tenantOrderId '${orderForCreation.tenantOrderId}'.`, err);
      throw err;
    }
  }

  public async cancel(orderId: string, version: number): Promise<Order> {
    try {
      const order = await this.apiClient.post<Order>(`${this.path}/${orderId}/actions`, {
        name: OrderCancelActionParameter.NameEnum.CANCEL,
        version,
      });

      return order;
    } catch (err) {
      this.logger.error(`Could not cancel order with id '${orderId}' and version ${version}.`, err);
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
      this.logger.error(`Could not unlock order with id '${orderId}' and version ${version}.`, err);
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

    this.logger.warn(
      `Did not find exactly 1 order with tenantOrderId '${tenantOrderId}' but ${length}, returning first one with id '${firstOrder.id}'`
    );
    return firstOrder;
  }
}
