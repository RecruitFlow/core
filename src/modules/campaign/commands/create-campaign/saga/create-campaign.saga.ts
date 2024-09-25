import { Inject, Injectable } from '@nestjs/common';
import { CreateCampaignStep } from './create-campaign.step';
import { InitiateJobStep } from './initiate-job.step';
import { Step } from '@libs/ddd/step.base';
import { CampaignEntity } from '@modules/campaign/domain/campaign.entity';
import { Logger } from '@nestjs/common';
import {
  CAMPAIGN_CREATE_STEP,
  INITIALIZE_JOB_STEP,
} from '@modules/campaign/campaign.di-tokens';

@Injectable()
export class CreateCampaignSaga {
  private steps: Step<CampaignEntity, void>[] = [];
  private successfulSteps: Step<CampaignEntity, void>[] = [];
  private logger: Logger;

  constructor(
    @Inject(CAMPAIGN_CREATE_STEP) createCampaignStep: CreateCampaignStep,
    @Inject(INITIALIZE_JOB_STEP) initiateJobStep: InitiateJobStep,
  ) {
    this.steps = [createCampaignStep, initiateJobStep];
    this.logger = new Logger('CreateCampaignSaga');
  }

  async execute(order: CampaignEntity) {
    for (const step of this.steps) {
      try {
        this.logger.debug(`Invoking: ${step.name}`);

        await step.invoke(order);

        this.successfulSteps.unshift(step);
      } catch (error) {
        this.logger.debug(`Failed Step: ${step.name} !!`);

        this.successfulSteps.forEach(async (s) => {
          this.logger.debug(`Rollbacking: ${s.name} ...`);

          await s.withCompensation(order);
        });

        throw error;
      }
    }

    this.logger.debug('CreateCampaignSaga ended successfully');
  }
}
