import { ResponseBase } from '@libs/api/response.base';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CampaignProviders } from '@modules/campaign/domain/campaign.types';

@ObjectType()
export class CampaignGraphqlResponseDto extends ResponseBase {
  @Field({
    description: 'Campaign identifier',
  })
  id: string;

  @Field({
    description: "Campaign's name",
  })
  name: string;

  @Field({
    description: "Campaign's keyword",
  })
  keyword: string;

  @Field({
    description: "Campaign's status",
  })
  status: string;

  @Field({
    description: "Campaign's end type",
  })
  endType: string;

  @Field({
    description: "Campaign's end value",
    nullable: true,
  })
  endValue: number;

  @Field({
    description: "Campaign's created date",
  })
  createdAt: string;

  @Field(() => [String], {
    description: "Campaign's providers",
  })
  @IsEnum(CampaignProviders)
  providers: CampaignProviders[];
}
