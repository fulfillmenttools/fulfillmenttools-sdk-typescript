import { FftApiError } from '../../common';
import { FftApiClient } from '../common';
import { Listing, ListingForReplacement, ModifyListingAction, StrippedListings } from '../types';

export class FftListingService {
  private readonly path = 'listings';

  constructor(private readonly apiClient: FftApiClient) {}

  public async create(facilityId: string, listing: ListingForReplacement): Promise<Listing> {
    try {
      const listingsForReplacement = { listings: [listing] };
      return await this.apiClient.put<Listing>(`facilities/${facilityId}/${this.path}`, {
        ...listingsForReplacement,
      });
    } catch (err) {
      console.error(`Could not create listing ${listing.tenantArticleId} for facility ${facilityId}.`, err);
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
      console.error(`Could not fetch listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async getAll(facilityId: string, size = 25): Promise<StrippedListings> {
    try {
      return await this.apiClient.get<StrippedListings>(`facilities/${facilityId}/${this.path}`, {
        ...(size && { size: size.toString() }),
      });
    } catch (err) {
      console.error(`Could not get listings for facility ${facilityId}.`, err);
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
      console.error(`Could not update listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async delete(facilityId: string, tenantArticleId: string): Promise<void> {
    try {
      return await this.apiClient.delete<void>(`facilities/${facilityId}/${this.path}/${tenantArticleId}`);
    } catch (err) {
      console.error(`Could not delete listing ${tenantArticleId} for facility ${facilityId}.`, err);
      throw err;
    }
  }

  public async deleteAll(facilityId: string): Promise<void> {
    try {
      return await this.apiClient.delete<void>(`facilities/${facilityId}/${this.path}`);
    } catch (err) {
      console.error(`Could not delete listings for facility ${facilityId}.`, err);
      throw err;
    }
  }
}
