import { faker } from '@faker-js/faker';
import {
  ArticleAttributeItem,
  FftApiClient,
  FftListingService,
  FftStockService,
  ListingForReplacement,
  StockForCreation,
} from '@fulfillmenttools/fulfillmenttools-sdk-typescript';
import { error, log } from 'node:console';

export async function runExample(fftApiClient: FftApiClient, ...args: string[]): Promise<void> {
  if (args.length < 2) {
    error('Missing required parameters');
    return;
  }
  const facilityId = args[0];
  const numberOfSamples = parseInt(args[1]);
  if (isNaN(numberOfSamples) || numberOfSamples < 1) {
    error('Number of Samples must be positive number');
    return;
  }
  log(`Creating ${numberOfSamples} listings with stocks for facility ${facilityId}...`);

  try {
    const fftListingService = new FftListingService(fftApiClient);
    const fftStockService = new FftStockService(fftApiClient);

    const listings: ListingForReplacement[] = [];
    const stocks: StockForCreation[] = [];

    for (let count = 1; count <= numberOfSamples; count++) {
      const tenantArticleId = `PRODUCT-${count.toString().padStart(4, '0')}`;
      const listing: ListingForReplacement = {
        tenantArticleId,
        title: faker.commerce.productName(),
        imageUrl: faker.image.url(),
        attributes: [
          {
            category: ArticleAttributeItem.CategoryEnum.Descriptive,
            key: '%%subtitle%%',
            value: faker.commerce.department(),
          },
          {
            category: ArticleAttributeItem.CategoryEnum.Shop,
            key: 'valuePerUnit',
            value: '' + faker.number.float({ min: 10, max: 200, fractionDigits: 2 }) * 100,
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

      const stock: StockForCreation = {
        facilityRef: facilityId,
        tenantArticleId,
        value: faker.number.int(100),
      };
      stocks.push(stock);
    }

    await Promise.all(listings.map(async (listing) => await fftListingService.create(facilityId, listing)));

    await Promise.all(stocks.map(async (stock) => await fftStockService.createStock(stock)));
  } catch (err) {
    error('Something bad happened', err);
  }
}
