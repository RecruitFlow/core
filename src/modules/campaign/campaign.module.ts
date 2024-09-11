import { Logger, Module, Provider } from '@nestjs/common';
import { CampaignRepository } from './database/campaign.repository';
import { FindUsersHttpController } from './queries/list-campaign/list-campaign.http.controller';
import { ListCampaignQueryHandler } from './queries/list-campaign/list-campaign.query-handler';
import { CampaignMapper } from './campaign.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { CAMPAIGN_REPOSITORY } from './campaign.di-tokens';
import { ListCampaignGraphqlResolver } from './queries/list-campaign/list-campaign.graphql-resolver';
import { PrismaModule } from '@libs/db/prisma.module';

const httpControllers = [FindUsersHttpController];

const graphqlResolvers: Provider[] = [ListCampaignGraphqlResolver];

const queryHandlers: Provider[] = [ListCampaignQueryHandler];

const mappers: Provider[] = [CampaignMapper];

const repositories: Provider[] = [
  { provide: CAMPAIGN_REPOSITORY, useClass: CampaignRepository },
];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...graphqlResolvers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class CampaignModule {}
