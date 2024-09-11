import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { CampaignEntity } from '../domain/campaign.entity';

export interface FindUsersParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}

export interface CampaignRepositoryPort
  extends RepositoryPort<CampaignEntity> {}
