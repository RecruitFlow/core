import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@libs/db/prisma.module';
import { kafkaConfig } from '@config/kafka.config';
import { CreateCandidateHttpController } from '@modules/candidate/commands/create-candidate/create-candidate.http.controller';

import { CandidateMapper } from './candidate.mapper';
import { CandidateRepository } from './database/candidate.repository';
import { CANDIDATE_REPOSITORY, CANDIDATE_MAPPER } from './candidate.di-tokens';
import { CreateCandidateService } from './commands/create-candidate/create-candidate.service';

const httpControllers = [CreateCandidateHttpController];

const mappers: Provider[] = [
  { provide: CANDIDATE_MAPPER, useClass: CandidateMapper },
];

const commandHandlers: Provider[] = [CreateCandidateService];

const repositories: Provider[] = [
  { provide: CANDIDATE_REPOSITORY, useClass: CandidateRepository },
];

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    ClientsModule.register([
      {
        name: kafkaConfig.services.candidate.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig.services.candidate.clientId,
            brokers: kafkaConfig.brokers,
          },
          consumer: {
            groupId: kafkaConfig.services.candidate.groupId,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [...httpControllers],
  providers: [Logger, ...repositories, ...commandHandlers, ...mappers],
})
export class CandidateModule {}
