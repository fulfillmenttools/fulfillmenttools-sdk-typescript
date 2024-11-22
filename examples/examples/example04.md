## Example 04 - Create and confirm order promise

This example shows how to create an order promise in the first step.
We will use random product and consumer data.
In the second step we confirm the promise to turn it into a proper order.

## How to call the example from the runner

```typescript
import { runExample } from './example04';
const tenantArticleId = getTenantArticleId();
runExample(fftApiClient, tenantArticleId);
```

## How it works

```typescript
try {
  // create instance of listing service and stock service
  const fftOrderService = new FftOrderService(fftApiClient);

  // construct order line item
  const orderLineItems: OrderLineItemForCreation[] = [];
  orderLineItems.push({
    article: {
      tenantArticleId,
      title: 'Product Name',
    },
    quantity: 5,
  });
  // construct order
  const orderForCreation: OrderForCreation = {
    consumer: {
      addresses: [
        {
          addressType: AddressType.POSTALADDRESS,
          firstName: 'Erika',
          lastName: 'Mustermann',
          street: 'Heidestr.',
          houseNumber: '17',
          postalCode: '51147',
          city: 'Köln',
          country: 'DE',
          email: 'noreply@noemail.com',
          phoneNumbers: [
            {
              type: AddressPhoneNumbers.TypeEnum.MOBILE,
              value: '0171-12345678',
            },
          ],
        },
      ],
    },
    orderDate: new Date(),
    tenantOrderId: 'FFT-4711', // tenant order id must be unique
    orderLineItems,
    deliveryPreferences: {
      shipping: {
        serviceLevel: DeliveryPreferencesShipping.ServiceLevelEnum.DELIVERY,
      },
    },
    promisesOptions: {
      validUntil: add(new Date(), { minutes: 5 }), // promise shall be valid for 5 minutes
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

  // confirm order promise
  order = await fftOrderService.confirmPromise(order.id, order.version);
  log(`Confirmed Order Promise ${order.id} ${order.version} ${order.status}`);
}
```

See the [example04.ts](./src/example04.ts) file for the full example that shows how to create an order promise and confirm it in a second step.

## Reference

This example is using the `POST /api/promises/deliverypromise` and `POST /api/orders/{orderId}/actions` endpoints. 
See the OpenAPI specification for [promises](https://fulfillmenttools.github.io/api-reference-ui/#/DOMS%20-%20Orders/postDeliveryPromise) and [orders](https://fulfillmenttools.github.io/api-reference-ui/#/DOMS%20-%20Orders/orderAction) for further details on those operations.
