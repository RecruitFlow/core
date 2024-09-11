import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { CampaignModel } from '../../database/campaign.repository';
import { PrismaService } from '@libs/db/prisma.service';

export class ListCampaignQuery extends PaginatedQueryBase {}

@QueryHandler(ListCampaignQuery)
export class ListCampaignQueryHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: ListCampaignQuery,
  ): Promise<Result<Paginated<CampaignModel>, Error>> {
    const [records, count] = await Promise.all([
      this.prisma.campaign.findMany({
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
      this.prisma.campaign.count(),
    ]);

    return Ok(
      new Paginated({
        data: records,
        count: count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
