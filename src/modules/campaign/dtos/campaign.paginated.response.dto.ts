import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base';
import { CampaignResponseDto } from './campaign.response.dto';

export class CampaignPaginatedResponseDto extends PaginatedResponseDto<CampaignResponseDto> {
  @ApiProperty({ type: CampaignResponseDto, isArray: true })
  readonly data: readonly CampaignResponseDto[];
}
