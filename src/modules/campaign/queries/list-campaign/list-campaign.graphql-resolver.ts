import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Result } from 'oxide.ts';
import { ResponseBase } from '../../../../libs/api/response.base';
import { Paginated } from '../../../../libs/ddd';
import { PaginatedParams } from '../../../../libs/ddd/query.base';
import { CampaignModel } from '../../database/campaign.repository';
import { CampaignPaginatedGraphqlResponseDto } from '../../dtos/graphql/campaign.paginated-gql-response.dto';
import { ListCampaignQuery } from './list-campaign.query-handler';

@Resolver()
export class ListCampaignGraphqlResolver {
  constructor(private readonly queryBus: QueryBus) {}
  @Query(() => CampaignPaginatedGraphqlResponseDto)
  async listCampaign(
    @Args('options', { type: () => String })
    options: PaginatedParams<ListCampaignQuery>,
  ): Promise<CampaignPaginatedGraphqlResponseDto> {
    const query = new ListCampaignQuery(options);
    const result: Result<
      Paginated<CampaignModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    const response = new CampaignPaginatedGraphqlResponseDto({
      ...paginated,
      data: paginated.data.map((campaign) => ({
        ...new ResponseBase(campaign),
        name: campaign.name,
        keyword: campaign.keyword,
        status: campaign.status,
        endType: campaign.endType,
        endValue: campaign.endValue,
      })),
    });

    return response;
  }
}
