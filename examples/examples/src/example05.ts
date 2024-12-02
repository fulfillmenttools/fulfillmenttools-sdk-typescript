import { fakerDE as faker } from '@faker-js/faker';
import {
  AddressPhoneNumbers,
  AddressType,
  DeliveryPreferencesShipping,
  FftApiClient,
  FftOrderService,
  OrderForCreation,
  OrderLineItemForCreation,
} from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import { add, format } from 'date-fns';
import { error, log } from 'node:console';

// Ex 5: TODO
export async function runExample(fftApiClient: FftApiClient, ...args: string[]): Promise<void> {
  if (args.length < 1) {
    error('Missing required parameters');
    return;
  }
  const tenantArticleId = args[0];
  log(`Creating Order Promise...`);

  try {
    // create instance of listing service and stock service
    const fftOrderService = new FftOrderService(fftApiClient);

    // construct order line item with random data
    const orderLineItems: OrderLineItemForCreation[] = [];
    orderLineItems.push({
      article: {
        tenantArticleId,
        title: faker.food.fruit(),
      },
      quantity: faker.number.int({ min: 1, max: 10 }),
    });
    // construct order
    const orderForCreation: OrderForCreation = {
      consumer: {
        addresses: [
          {
            addressType: AddressType.POSTALADDRESS,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            street: faker.location.street(),
            houseNumber: '' + faker.number.int({ min: 1, max: 50 }),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: 'DE',
            email: 'noreply@noemail.com',
            phoneNumbers: [
              {
                type: AddressPhoneNumbers.TypeEnum.MOBILE,
                value: faker.phone.number(),
              },
            ],
          },
        ],
      },
      orderDate: new Date(),
      tenantOrderId: `FFT-${currentDateFormatted()}`,
      orderLineItems,
      deliveryPreferences: {
        shipping: {
          serviceLevel: DeliveryPreferencesShipping.ServiceLevelEnum.DELIVERY,
        },
      },
      promisesOptions: {
        validUntil: add(new Date(), { minutes: 5 }),
      },
    };

    // create delivery promise
    const deliveryPromise = await fftOrderService.createPromise(orderForCreation);
    log(`Created Order Promise ${deliveryPromise.orderRef} ${deliveryPromise.promisesOptions?.validUntil}`);

    // lookup order
    let order = await fftOrderService.findBy(deliveryPromise.orderRef);
    log(
      `Retrieved Order ${order.tenantOrderId} ${order.id} ${order.version} ${order.status} ${order.promisesOptions?.validUntil}`
    );

    if (Math.random() > 0.5) {
      // confirm order promise
      order = await fftOrderService.confirmPromise(order.id, order.version);
      log(`Confirmed Order Promise ${order.tenantOrderId} ${order.id} ${order.version} ${order.status}`);
    } else {
      // cancel order
      order = await fftOrderService.cancel(order.id, order.version, true);
      log(`Cancelled Order ${order.tenantOrderId} ${order.id} ${order.version} ${order.status}`);
    }
  } catch (err) {
    error('Something bad happened', err);
  }
}

function currentDateFormatted() {
  return format(new Date(), 'yyyyMMdd-kkmmss');
}
