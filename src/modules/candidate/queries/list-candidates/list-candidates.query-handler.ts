import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { CandidateModel } from '../../database/candidate.repository';
import { PrismaService } from '@libs/db/prisma.service';
import { Inject } from '@nestjs/common';
import { CANDIDATE_REPOSITORY } from '../../candidate.di-tokens';
import { CandidateRepositoryPort } from '../../database/candidate.repository.port';

export class ListCandidatesQuery extends PaginatedQueryBase {}

@QueryHandler(ListCandidatesQuery)
export class ListCandidatesQueryHandler implements IQueryHandler {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CANDIDATE_REPOSITORY)
    protected readonly candidateRepo: CandidateRepositoryPort,
  ) {}

  async execute(
    query: ListCandidatesQuery,
  ): Promise<Result<Paginated<CandidateModel>, Error>> {
    const [records, count] = await Promise.all([
      this.prisma.candidate.findMany({
        ...(query.filters.length && {
          where: {
            AND: query.filters.map(({ id, value }) => ({
              [id]: {
                in: value,
              },
            })),
          },
        }),
        ...(query.orderBy && {
          orderBy: { [query.orderBy.field]: query.orderBy.param },
        }),
        skip: query.offset,
        take: query.limit,
      }),
      this.prisma.candidate.count(),
    ]);

    return Ok(
      new Paginated({
        data: records as CandidateModel[],
        count: count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
