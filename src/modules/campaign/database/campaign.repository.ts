import { CampaignRepositoryPort } from './campaign.repository.port';
import { z } from 'zod';
import { CampaignMapper } from '../campaign.mapper';
import {
  CampaignStatus,
  CampaignEndType,
  CampaignProviders,
} from '../domain/campaign.types';
import { CampaignEntity } from '../domain/campaign.entity';
import { PrismaRepositoryBase } from '@src/libs/db/prisma-repository.base';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@libs/db/prisma.service';
import { Prisma } from '@prisma/client';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const campaignSchema = z.object({
  id: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string(),
  keyword: z.string(),
  status: z.nativeEnum(CampaignStatus),
  endType: z.nativeEnum(CampaignEndType),
  endValue: z.number().nullable(),
  providers: z.array(z.nativeEnum(CampaignProviders)),
});

export type CampaignModel = z.infer<typeof campaignSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class CampaignRepository
  extends PrismaRepositoryBase<CampaignEntity, CampaignModel>
  implements CampaignRepositoryPort
{
  protected modelName = Prisma.ModelName.Campaign;

  constructor(
    mapper: CampaignMapper,
    eventEmitter: EventEmitter2,
    readonly prisma: PrismaService,
  ) {
    super(prisma, mapper, eventEmitter, new Logger(CampaignRepository.name));
  }
}
