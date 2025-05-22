import { FftApiError, Logger } from '../../common';
import { FftApiClient } from '../common';
import {
  Listing,
  ListingBulkOperationResult,
  ListingForReplacement,
  ModifyListingAction,
  StrippedListings,
} from '../types';

export class FftListingService {
  private readonly path = 'listings';
  private readonly log: Logger;

  constructor(private readonly apiClient: FftApiClient) {
    this.log = apiClient.getLogger();
  }

  public async create(facilityId: string, listing: ListingForReplacement): Promise<Listing> {
    try {
      const listingsForReplacement = { listings: [listing] };
      const results = await this.apiClient.put<ListingBulkOperationResult[]>(`facilities/${facilityId}/${this.path}`, {
        ...listingsForReplacement,
      });
      if (
        results !== undefined &&
        results.length > 0 &&
        (results[0].status === 'CREATED' || results[0].status === 'UPDATED')
      ) {
        return results[0].listing;
      } else {
        throw new FftApiError({
          message: `Could not create listing ${listing.tenantArticleId}.`,
        });
      }
    } catch (err) {
      this.log.error(`Could not create listing ${listing.tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async get(facilityId: string, tenantArticleId: string, relaxed = false): Promise<Listing | undefined> {
    try {
      return await this.apiClient.get<Listing>(`facilities/${facilityId}/${this.path}/${tenantArticleId}`);
    } catch (err) {
      if (relaxed && FftApiError.isApiError(err) && err.status === 404) {
        return undefined;
      }
      this.log.error(`Could not fetch listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async getAll(facilityId: string, size = 25, startAfterId?: string): Promise<StrippedListings> {
    try {
      return await this.apiClient.get<StrippedListings>(`facilities/${facilityId}/${this.path}`, {
        ...(size && { size: size.toString() }),
        ...(startAfterId && { startAfterId }),
      });
    } catch (err) {
      this.log.error(`Could not get listings for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async update(facilityId: string, tenantArticleId: string, action: ModifyListingAction): Promise<Listing> {
    try {
      action.action = ModifyListingAction.ActionEnum.ModifyListing;
      const listing = await this.get(facilityId, tenantArticleId);
      const listingPatchActions = {
        actions: [action],
        version: listing?.version,
      };
      return await this.apiClient.patch<Listing>(`facilities/${facilityId}/${this.path}/${tenantArticleId}`, {
        ...listingPatchActions,
      });
    } catch (err) {
      this.log.error(`Could not update listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async delete(facilityId: string, tenantArticleId: string): Promise<null> {
    try {
      return await this.apiClient.delete<null>(`facilities/${facilityId}/${this.path}/${tenantArticleId}`);
    } catch (err) {
      this.log.error(`Could not delete listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async deleteAll(facilityId: string): Promise<null> {
    try {
      return await this.apiClient.delete<null>(`facilities/${facilityId}/${this.path}`);
    } catch (err) {
      this.log.error(`Could not delete listings for facility ${facilityId}.`, err);
      throw err;
    }
  }
}
