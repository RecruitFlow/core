import { Body, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { ListCampaignRequestDto } from './list-campaign.request.dto';
import { ListCampaignQuery } from './list-campaign.query-handler';
import { Paginated } from '@src/libs/ddd';
import { CampaignPaginatedResponseDto } from '../../dtos/campaign.paginated.response.dto';
import { PaginatedQueryRequestDto } from '@src/libs/api/paginated-query.request.dto';
import { CampaignModel } from '../../database/campaign.repository';
import { ResponseBase } from '@src/libs/api/response.base';

@Controller(routesV1.version)
export class FindUsersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.campaign.root)
  @ApiOperation({ summary: 'Get List of Campaigns' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CampaignPaginatedResponseDto,
  })
  async findUsers(
    @Body() request: ListCampaignRequestDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<CampaignPaginatedResponseDto> {
    const query = new ListCampaignQuery({
      ...request,
      limit: queryParams?.limit,
      page: queryParams?.page,
    });
    const result: Result<
      Paginated<CampaignModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new CampaignPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase(user),
        name: user.name,
        keyword: user.keyword,
        status: user.status,
        endType: user.endType,
        endValue: user.endValue,
        providers: user.providers,
      })),
    });
  }
}
