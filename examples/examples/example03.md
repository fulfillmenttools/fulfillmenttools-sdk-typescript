## Example 03 - Create listings and stocks

This example shows how to create listings and stocks. It will create random product listings and assign inventory to each product. You can use this as a starting point to implement your own product listing importer, e.g. read data from an Excel sheet, convert it and upload it into fulfillmenttools.

## How to call the example from the runner

Include the following code snippet into the example runner:

```typescript
import { runExample } from './example03';
const facilityId = getFacilityId();
const count = getCount();
runExample(fftApiClient, facilityId, count);
```

## How it works

This example shows first how to construct the `ListingForReplacement` object required to create a product listing.
In the second step a `StockForCreation` object is constructed which is then used to set the inventory level for that product.
Here we use random dummy data where in a real world scenario the product data would be coming from an ERP, shop system, etc.

```typescript
try {
  // create instance of listing service and stock service
  const fftListingService = new FftListingService(fftApiClient);
  const fftStockService = new FftStockService(fftApiClient);

  const listings: ListingForReplacement[] = [];
  const stocks: StockForCreation[] = [];

  for (let count = 1; count <= numberOfSamples; count++) {
    // construct a unique tenant article id (SKU)
    const tenantArticleId = `PRODUCT-${count.toString().padStart(4, '0')}`;
    // construct listing with product attributes
    const listing: ListingForReplacement = {
      tenantArticleId,
      title: 'Product Name',
      imageUrl: 'https://loremflickr.com/3956/1492?lock=1085939504373621',
      attributes: [
        {
          category: ArticleAttributeItem.CategoryEnum.Descriptive,
          key: '%%subtitle%%',
          value: 'Product Subtitle',
        },
        {
          category: ArticleAttributeItem.CategoryEnum.Shop,
          key: 'valuePerUnit',
          value: '15099', // shop price is in cents
          type: ArticleAttributeItem.TypeEnum.NUMBER,
        },
        {
          category: ArticleAttributeItem.CategoryEnum.Shop,
          key: 'currency',
          value: 'EUR',
          type: ArticleAttributeItem.TypeEnum.CURRENCY,
        },
      ],
    };
    listings.push(listing);

    // construct stock for listing
    const stock: StockForCreation = {
      facilityRef: facilityId,
      tenantArticleId,
      value: 50,
    };
    stocks.push(stock);
  }

  // create all listings
  await Promise.all(listings.map(async (listing) => await fftListingService.create(facilityId, listing)));

  // create all stocks
  await Promise.all(stocks.map(async (stock) => await fftStockService.createStock(stock)));
}
```

See the [example03.ts](./src/example03.ts) file for the full example that shows how to create listings and associated stocks.

## Reference

This example is using the `PUT /api/listings` and `POST /api/stocks` endpoint. 
See the OpenAPI specification for [listings](https://fulfillmenttools.github.io/api-reference-ui/#/Core%20-%20Listings/putFacilityListing) and [stocks](https://fulfillmenttools.github.io/api-reference-ui/#/Inventory%20Management%20-%20Stocks/createStock) for further details on those operations.
