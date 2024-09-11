import { Logger, Module, Provider } from '@nestjs/common';
import { CampaignRepository } from './database/campaign.repository';
// import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
// import { DeleteUserHttpController } from './commands/delete-user/delete-user.http-controller';
// import { CreateUserCliController } from './commands/create-user/create-user.cli.controller';
// import { FindUsersHttpController } from './queries/list-campaign/list-campaign.request.dto';
// import { CreateUserMessageController } from './commands/create-user/create-user.message.controller';
// import { CreateUserGraphqlResolver } from './commands/create-user/graphql-example/create-user.graphql-resolver';
// import { CreateUserService } from './commands/create-user/create-user.service';
// import { DeleteUserService } from './commands/delete-user/delete-user.service';
import { ListCampaignQueryHandler } from './queries/list-campaign/list-campaign.query-handler';
import { CampaignMapper } from './campaign.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { CAMPAIGN_REPOSITORY } from './campaign.di-tokens';
import { ListCampaignGraphqlResolver } from './queries/list-campaign/list-campaign.graphql-resolver';
import { PrismaModule } from '@libs/db/prisma.module';

// const httpControllers = [
//   CreateUserHttpController,
//   DeleteUserHttpController,
//   FindUsersHttpController,
// ];

// const messageControllers = [CreateUserMessageController];

// const cliControllers: Provider[] = [CreateUserCliController];

const graphqlResolvers: Provider[] = [ListCampaignGraphqlResolver];

// const commandHandlers: Provider[] = [CreateUserService, DeleteUserService];

const queryHandlers: Provider[] = [ListCampaignQueryHandler];

const mappers: Provider[] = [CampaignMapper];

const repositories: Provider[] = [
  { provide: CAMPAIGN_REPOSITORY, useClass: CampaignRepository },
];

@Module({
  imports: [CqrsModule, PrismaModule],
  //   controllers: [...httpControllers],
  //   controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    // ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    // ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class CampaignModule {}
