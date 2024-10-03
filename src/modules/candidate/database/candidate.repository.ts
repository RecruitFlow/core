import { CandidateRepositoryPort } from './candidate.repository.port';
import { z } from 'zod';
import { CandidateMapper } from '../candidate.mapper';
import { WorkTime, WorkLocation } from '../domain/candidate.types';
import { CandidateEntity } from '../domain/candidate.entity';
import { PrismaRepositoryBase } from '@src/libs/db/prisma-repository.base';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@libs/db/prisma.service';
import { Prisma } from '@prisma/client';
import { CANDIDATE_MAPPER } from '../candidate.di-tokens';

export const candidateSchema = z.object({
  id: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string(),
  age: z.number().optional(),
  workTime: z.nativeEnum(WorkTime),
  workLocation: z.nativeEnum(WorkLocation),
  salary: z.number().optional(),
  skills: z.array(z.string()),
  location: z.string().optional(),
  languages: z.array(z.string()).optional(),
  yearsOfExperience: z.number().optional(),
  campaignId: z.string(),
});

export type CandidateModel = z.infer<typeof candidateSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class CandidateRepository
  extends PrismaRepositoryBase<CandidateEntity, CandidateModel>
  implements CandidateRepositoryPort
{
  protected modelName = Prisma.ModelName.Candidate;

  constructor(
    readonly prisma: PrismaService,
    @Inject(CANDIDATE_MAPPER)
    mapper: CandidateMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(prisma, mapper, eventEmitter, new Logger(CandidateRepository.name));
  }
}
