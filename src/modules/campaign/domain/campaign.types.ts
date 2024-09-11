// import { Address } from './value-objects/address.value-object';
import {
  Campaign,
  CampaignStatus,
  CampaignEndType,
  Providers,
} from '@prisma/client';

// All properties that a Campaign has
export interface CampaignProps
  extends Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'> {}

// Properties that are needed for a Campaign creation
export interface CreateCampaignProps
  extends Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'> {}

// Properties used for updating a Campaign
export interface UpdateCampaignProps {
  name: string;
  keyword: string;
  status: CampaignStatus;
  endType: CampaignEndType;
  endValue: number | null;
  providers: Providers[];
}

export { CampaignStatus, CampaignEndType, Providers as CampaignProviders };
