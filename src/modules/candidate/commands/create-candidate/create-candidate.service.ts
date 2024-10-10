import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { CreateCandidateCommand } from './create-candidate.command';
import { CANDIDATE_REPOSITORY } from '../../candidate.di-tokens';
import { CandidateEntity } from '@modules/candidate/domain/candidate.entity';
import {
  CandidateAlreadyExistError,
  CandidateCampaignNotFoundError,
} from '@modules/candidate/domain/candidate.errors';
import { CandidateRepositoryPort } from '@modules/candidate/database/candidate.repository.port';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateCandidateCommand)
export class CreateCandidateService implements ICommandHandler {
  constructor(
    @Inject(CANDIDATE_REPOSITORY)
    protected readonly candidateRepo: CandidateRepositoryPort,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(CreateCandidateService.name);
  }

  async execute(
    command: CreateCandidateCommand,
  ): Promise<
    Result<
      AggregateID,
      CandidateAlreadyExistError | CandidateCampaignNotFoundError
    >
  > {
    const candidate = CandidateEntity.create({
      name: command.name,
      campaignId: command.campaignId,
      age: command.age,
      workTime: command.workTime,
      workLocation: command.workLocation,
      position: command.position,
      salary: command.salary,
      skills: command.skills,
      location: command.location,
      languages: command.languages,
      yearsOfExperience: command.yearsOfExperience,
    });

    try {
      await this.candidateRepo.create(candidate);

      this.logger.debug(
        `Candidate created with ID: ${candidate.id} Name: ${candidate.getProps().name}`,
      );

      return Ok(candidate.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new CandidateAlreadyExistError(error));
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        console.log('error', error);
        return Err(new CandidateCampaignNotFoundError());
      }

      throw error;
    }
  }
}
