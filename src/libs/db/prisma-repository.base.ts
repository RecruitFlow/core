import { PrismaClient, Prisma } from '@prisma/client';
import { AggregateRoot, PaginatedQueryParams, Paginated } from '@libs/ddd';
import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { ObjectLiteral } from '../types';
import { Mapper } from '@libs/ddd';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerPort } from '../ports/logger.port';
import { None, Option, Some } from 'oxide.ts';

export abstract class PrismaRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> {
  protected abstract modelName: Prisma.ModelName;

  protected constructor(
    protected readonly prisma: PrismaClient,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: LoggerPort,
  ) {}

  async findById(id: string): Promise<Option<Aggregate>> {
    const result = await this.prisma[this.modelName].findUnique({
      where: { id },
    });

    return result ? Some(this.mapper.toDomain(result)) : None;
  }

  async findAll(): Promise<Aggregate[]> {
    const result = await this.prisma[this.modelName].findMany();

    return result.map(this.mapper.toDomain);
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Aggregate>> {
    const result = await this.prisma[this.modelName].findMany({
      take: params.limit,
      skip: params.offset,
    });

    return new Paginated({
      data: result.map(this.mapper.toDomain),
      count: result.length,
      limit: params.limit,
      page: params.page,
    });
  }

  async create(entity: Aggregate): Promise<void> {
    entity.validate();

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] create entities ${
        entity.id
      } from ${this.modelName}`,
    );

    await this.prisma[this.modelName].create({
      data: this.mapper.toPersistence(entity),
    });

    await entity.publishEvents(this.logger, this.eventEmitter);
  }

  async update(entity: Aggregate): Promise<void> {
    entity.validate();

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] update entities ${
        entity.id
      } from ${this.modelName}`,
    );

    await this.prisma[this.modelName].update({
      where: { id: entity.id },
      data: this.mapper.toPersistence(entity),
    });

    entity.publishEvents(this.logger, this.eventEmitter);
  }

  async delete(entity: Aggregate): Promise<boolean> {
    entity.validate();

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] deleting entities ${
        entity.id
      } from ${this.modelName}`,
    );

    const result = await this.prisma[this.modelName].delete({
      where: { id: entity.id },
    });

    await entity.publishEvents(this.logger, this.eventEmitter);

    return !!result;
  }
}
