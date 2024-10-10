import { Controller } from '@nestjs/common';
import { CreateCandidateService } from './create-candidate.service';
import { match, Result } from 'oxide.ts';
import {
  ConflictException as ConflictHttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateCommand } from './create-candidate.command';
import { CreateCandidateRequestDto } from './create-candidate.request.dto';
import {
  CandidateAlreadyExistError,
  CandidateCampaignNotFoundError,
} from '@modules/candidate/domain/candidate.errors';
import {
  Transport,
  EventPattern,
  Payload,
  KafkaContext,
  Ctx,
} from '@nestjs/microservices';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';

@Controller()
export class CreateCandidateKafkaController {
  constructor(private readonly commandBus: CreateCandidateService) {}

  @EventPattern('candidate_action_save', Transport.KAFKA)
  async create(
    @Payload() data: CreateCandidateRequestDto,
    @Ctx() context: KafkaContext,
  ): Promise<IdResponse> {
    const command = new CreateCandidateCommand({
      ...data,
      metadata: {
        correlationId: context.getMessage().timestamp,
        timestamp: new Date().getTime(),
      },
    });

    const result: Result<
      AggregateID,
      CandidateAlreadyExistError | CandidateCampaignNotFoundError
    > = await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CandidateAlreadyExistError)
          throw new ConflictHttpException(error.message);

        if (error instanceof CandidateCampaignNotFoundError)
          throw new NotFoundException(error.message);
        throw error;
      },
    });
  }
}
