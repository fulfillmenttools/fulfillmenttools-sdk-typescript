import { Order, OrderForCreation, StrippedOrder } from '../types';
import { FftApiClient } from '../common';
export declare class FftOrderService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    create(orderForCreation: OrderForCreation): Promise<Order>;
    cancel(orderId: string): Promise<Order>;
    findBy(orderRef: string): Promise<Order>;
    findByTenantOrderId(tenantOrderId: string): Promise<StrippedOrder | undefined>;
}
