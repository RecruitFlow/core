import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedGraphqlResponse } from '../../../../libs/api/graphql/paginated.graphql-response.base';

import { CampaignGraphqlResponseDto } from './campaign.graphql-response.dto';

@ObjectType()
export class CampaignPaginatedGraphqlResponseDto extends PaginatedGraphqlResponse(
  CampaignGraphqlResponseDto,
) {
  @Field(() => [CampaignGraphqlResponseDto])
  data: CampaignGraphqlResponseDto[];
}
