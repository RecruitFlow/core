import { Inject, Injectable } from '@nestjs/common';
import { Step } from '@libs/ddd/step.base';
import { CampaignEntity } from '@modules/campaign/domain/campaign.entity';
import { kafkaConfig } from '@config/kafka.config';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FailedCreateFinderJob } from './saga.exceptions';

@Injectable()
export class InitiateJobStep extends Step<CampaignEntity, void> {
  constructor(
    @Inject(kafkaConfig.services.finder.name)
    private finderClient: ClientKafka,
  ) {
    super();
    this.name = 'Initialize Finder Job';
  }

  async invoke(campaign: CampaignEntity): Promise<void> {
    const { status = false } = await lastValueFrom(
      this.finderClient.send('finder.create.job', campaign.getProps()),
    );

    if (!status) {
      console.log('error');

      throw new FailedCreateFinderJob();
    }
  }

  withCompensation(): Promise<void> {
    return Promise.resolve();
  }

  async onModuleInit() {
    this.finderClient.subscribeToResponseOf('finder.create.job');

    await this.finderClient.connect();
  }
}
