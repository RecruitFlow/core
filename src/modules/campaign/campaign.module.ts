import { Logger, Module, Provider } from '@nestjs/common';
import { CampaignRepository } from './database/campaign.repository';
import { ListCampaignHttpController } from './queries/list-campaign/list-campaign.http.controller';
import { ListCampaignQueryHandler } from './queries/list-campaign/list-campaign.query-handler';
import { CampaignMapper } from './campaign.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CAMPAIGN_REPOSITORY,
  CAMPAIGN_CREATE_SAGA,
  CAMPAIGN_CREATE_STEP,
  INITIALIZE_JOB_STEP,
} from './campaign.di-tokens';
import { ListCampaignGraphqlResolver } from './queries/list-campaign/list-campaign.graphql-resolver';
import { PrismaModule } from '@libs/db/prisma.module';
import { CreateCampaignService } from './commands/create-campaign/create-campaign.service';
import { CreateCampaignGraphqlResolver } from './commands/create-campaign//create-campaign.graphql-resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '@config/kafka.config';
import { CreateCampaignSaga } from '@modules/campaign/commands/create-campaign/saga/create-campaign.saga';
import { CreateCampaignStep } from '@modules/campaign/commands/create-campaign/saga/create-campaign.step';
import { InitiateJobStep } from '@modules/campaign/commands/create-campaign/saga/initiate-job.step';

const httpControllers = [ListCampaignHttpController];

const graphqlResolvers: Provider[] = [
  ListCampaignGraphqlResolver,
  CreateCampaignGraphqlResolver,
];

const queryHandlers: Provider[] = [ListCampaignQueryHandler];

const mappers: Provider[] = [CampaignMapper];

const commandHandlers: Provider[] = [CreateCampaignService];

const repositories: Provider[] = [
  { provide: CAMPAIGN_REPOSITORY, useClass: CampaignRepository },
];

const sagas: Provider[] = [
  { provide: CAMPAIGN_CREATE_SAGA, useClass: CreateCampaignSaga },
];

const sagasSteps: Provider[] = [
  { provide: CAMPAIGN_CREATE_STEP, useClass: CreateCampaignStep },
  { provide: INITIALIZE_JOB_STEP, useClass: InitiateJobStep },
];
@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    ClientsModule.register([
      {
        name: kafkaConfig.services.finder.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig.services.finder.clientId,
            brokers: kafkaConfig.brokers,
          },
          consumer: {
            groupId: kafkaConfig.services.finder.groupId,
            allowAutoTopicCreation: false,
          },
        },
      },
    ]),
  ],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...sagas,
    ...sagasSteps,
  ],
})
export class CampaignModule {}
