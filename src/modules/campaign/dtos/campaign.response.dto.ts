import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class CampaignResponseDto extends ResponseBase {
  @ApiProperty({
    description: "Campaign's identifier",
  })
  id: string;

  @ApiProperty({
    example: 'Middle Back-End Developer',
    description: "Campaign's name",
  })
  name: string;

  @ApiProperty({
    example: 'developer',
    description: "Campaign's keyword",
  })
  keyword: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: "Campaign's status",
  })
  status: string;

  @ApiProperty({
    example: 'NEVER',
    description: "Campaign's end type",
  })
  endType: string;

  @ApiProperty({
    example: 10,
    description: "Campaign's end value",
    nullable: true,
  })
  endValue: number | null;

  @ApiProperty({
    example: ['GOOGLE', 'FACEBOOK'],
    description: "Campaign's providers",
    isArray: true,
  })
  providers: string[];

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: "Campaign's create date",
  })
  createdAt: string;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: "Campaign's update date",
  })
  updatedAt: string;
}
