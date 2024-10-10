import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@libs/db/prisma.module';
import { CreateCandidateHttpController } from '@modules/candidate/commands/create-candidate/create-candidate.http.controller';

import { CandidateMapper } from './candidate.mapper';
import { CandidateRepository } from './database/candidate.repository';
import { CANDIDATE_REPOSITORY, CANDIDATE_MAPPER } from './candidate.di-tokens';
import { CreateCandidateService } from './commands/create-candidate/create-candidate.service';
import { CreateCandidateKafkaController } from './commands/create-candidate/create-candidate.kafka';
import { ListCandidatesGraphqlResolver } from './queries/list-candidates/list-candidates.graphql-resolver';
import { ListCandidatesQueryHandler } from '@modules/candidate/queries/list-candidates/list-candidates.query-handler';
const httpControllers = [
  CreateCandidateHttpController,
  CreateCandidateKafkaController,
];

const graphqlResolvers: Provider[] = [ListCandidatesGraphqlResolver];

const mappers: Provider[] = [
  { provide: CANDIDATE_MAPPER, useClass: CandidateMapper },
];

const queryHandlers: Provider[] = [ListCandidatesQueryHandler];

const commandHandlers: Provider[] = [CreateCandidateService];

const repositories: Provider[] = [
  { provide: CANDIDATE_REPOSITORY, useClass: CandidateRepository },
];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...mappers,
    ...graphqlResolvers,
    ...queryHandlers,
  ],
})
export class CandidateModule {}
