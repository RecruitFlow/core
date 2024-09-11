import { CampaignRepository } from '@modules/campaign/database/campaign.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CreateCampaignCommand } from './create-campaign.command';
import { CampaignAlreadyExistError } from '@modules/campaign/domain/campaign.errors';
import { AggregateID } from '@libs/ddd';
import { CampaignEntity } from '@modules/campaign/domain/campaign.entity';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY } from '../../campaign.di-tokens';

@CommandHandler(CreateCampaignCommand)
export class CreateCampaignService implements ICommandHandler {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    protected readonly campaignRepo: CampaignRepository,
  ) {}

  async execute(
    command: CreateCampaignCommand,
  ): Promise<Result<AggregateID, CampaignAlreadyExistError>> {
    const user = CampaignEntity.create({
      name: command.name,
      keyword: command.keyword,
      endType: command.endType,
      endValue: command.endValue,
      providers: command.providers,
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.campaignRepo.create(user);
      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new CampaignAlreadyExistError(error));
      }
      throw error;
    }
  }
}
