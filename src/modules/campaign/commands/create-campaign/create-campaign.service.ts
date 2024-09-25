import { CampaignRepositoryPort } from '@modules/campaign/database/campaign.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CreateCampaignCommand } from './create-campaign.command';
import { CampaignAlreadyExistError } from '@modules/campaign/domain/campaign.errors';
import { AggregateID } from '@libs/ddd';
import { CampaignEntity } from '@modules/campaign/domain/campaign.entity';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import {
  CAMPAIGN_REPOSITORY,
  CAMPAIGN_CREATE_SAGA,
} from '../../campaign.di-tokens';
import { CreateCampaignSaga } from './saga/create-campaign.saga';
@CommandHandler(CreateCampaignCommand)
export class CreateCampaignService implements ICommandHandler {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    protected readonly campaignRepo: CampaignRepositoryPort,
    @Inject(CAMPAIGN_CREATE_SAGA)
    protected readonly saga: CreateCampaignSaga,
  ) {}

  async execute(
    command: CreateCampaignCommand,
  ): Promise<Result<AggregateID, CampaignAlreadyExistError>> {
    const campaign = CampaignEntity.create({
      name: command.name,
      keyword: command.keyword,
      endType: command.endType,
      endValue: command.endValue,
      providers: command.providers,
    });

    try {
      await this.saga.execute(campaign);

      return Ok(campaign.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new CampaignAlreadyExistError(error));
      }
      throw error;
    }
  }
}
