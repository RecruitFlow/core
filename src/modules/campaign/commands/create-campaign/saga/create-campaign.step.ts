import { Inject, Injectable } from '@nestjs/common';
import { Step } from '@libs/ddd/step.base';
import { CampaignEntity } from '@modules/campaign/domain/campaign.entity';
import { CampaignRepositoryPort } from '@modules/campaign/database/campaign.repository.port';
import { CAMPAIGN_REPOSITORY } from '@modules/campaign/campaign.di-tokens';

@Injectable()
export class CreateCampaignStep extends Step<CampaignEntity, void> {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private campaignRepository: CampaignRepositoryPort,
  ) {
    super();
    this.name = 'Create Campaign';
  }

  invoke(campaign: CampaignEntity): Promise<void> {
    /* Save the campaign into the repository. */
    this.campaignRepository.create(campaign);

    return Promise.resolve();
  }

  withCompensation(campaign: CampaignEntity): Promise<void> {
    /* If the Saga has failed, we need to pause the campaign to undo this step. */

    campaign.pause();

    this.campaignRepository.update(campaign);
    return Promise.resolve();
  }
}
