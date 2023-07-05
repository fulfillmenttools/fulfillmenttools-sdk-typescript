import { Shipment } from '../types';
import { FftApiClient } from '../common';
export declare class FftShipmentService {
    private readonly apiClient;
    private readonly path;
    private readonly logger;
    constructor(apiClient: FftApiClient);
    findById(shipmentId: string): Promise<Shipment>;
}
