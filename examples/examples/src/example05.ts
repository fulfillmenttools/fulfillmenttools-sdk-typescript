import {
  FftApiClient,
  FftHandoverService,
  FftOrderService,
  FftPackJobService,
  FftParcelService,
  FftPickJobService,
  FftProcessService,
  FftShipmentService,
  Process,
} from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import { error, log } from 'node:console';

// Ex 5: Retrieve process and related entities
export async function runExample(fftApiClient: FftApiClient, ...args: string[]): Promise<void> {
  if (args.length < 1) {
    error('Missing required parameters');
    return;
  }
  const tenantOrderId = args[0];
  log(`Retrieving Process ${tenantOrderId}...`);

  try {
    // create instance of services
    const fftProcessService = new FftProcessService(fftApiClient);
    const fftOrderService = new FftOrderService(fftApiClient);
    const fftPickJobService = new FftPickJobService(fftApiClient);
    const fftShipmentService = new FftShipmentService(fftApiClient);
    const fftParcelService = new FftParcelService(fftApiClient);
    const fftPackJobService = new FftPackJobService(fftApiClient);
    const fftHandoverService = new FftHandoverService(fftApiClient);

    // look up the process
    const process = await fftProcessService.getById(tenantOrderId);

    log(
      `Process ${process.id} status=${process.status}, operativeStatus=${process.operativeStatus}, domsStatus=${process.domsStatus}`
    );

    // look up referenced order
    if (process.orderRef) {
      const order = await fftOrderService.findBy(process.orderRef);
      log(`Order ${order.tenantOrderId} (${order.id}) status=${order.status}`);
    }

    // look up referenced pick jobs
    if (process.pickJobRefs && process.pickJobRefs.length > 0) {
      const pickJobs = await Promise.all(process.pickJobRefs.map(async (id) => await fftPickJobService.getById(id)));
      for (const pickJob of pickJobs) {
        log(`PickJob ${pickJob.id} status=${pickJob.status}`);
      }
    }

    // look up referenced shipments
    if (process.shipmentRefs && process.shipmentRefs.length > 0) {
      const shipments = await Promise.all(
        process.shipmentRefs.map(async (id) => await fftShipmentService.findById(id))
      );
      for (const shipment of shipments) {
        log(`Shipment ${shipment.id} status=${shipment.status}`);
        // look up referenced parcels
        if (shipment.parcels && shipment.parcels.length > 0) {
          const parcels = await Promise.all(
            shipment.parcels.map(async (parcel) => await fftParcelService.findById(parcel.parcelRef))
          );
          for (const parcel of parcels) {
            log(`  Parcel ${parcel.id} status=${parcel.status}`);
          }
        }
      }
    }

    // look up referenced pack jobs
    if (process.packJobRefs && process.packJobRefs.length > 0) {
      const packJobs = await Promise.all(process.packJobRefs.map(async (id) => await fftPackJobService.getById(id)));
      for (const packJob of packJobs) {
        log(`PackJob ${packJob.id} status=${packJob.status}`);
      }
    }

    // look up handover jobs
    if (process.handoverJobRefs && process.handoverJobRefs.length > 0) {
      const handoverJobs = await Promise.all(
        process.handoverJobRefs.map(async (id) => await fftHandoverService.findById(id))
      );
      for (const handoverJob of handoverJobs) {
        log(`HandoverJob ${handoverJob.id} status=${handoverJob.status}`);
      }
    }
  } catch (err) {
    error('Something bad happened', err);
  }
}
