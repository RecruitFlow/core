import { ResponseBase } from '@libs/api/response.base';
import { Field, ObjectType } from '@nestjs/graphql';

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

  // @Field({
  //   description: "Campaign's providers",
  // })
  // providers: Providers[];
}
