import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedGraphqlResponse } from '../../../../libs/api/graphql/paginated.graphql-response.base';

import { CandidateGraphqlResponseDto } from './candidate.graphql-response.dto';

@ObjectType()
export class CandidatePaginatedGraphqlResponseDto extends PaginatedGraphqlResponse(
  CandidateGraphqlResponseDto,
) {
  @Field(() => [CandidateGraphqlResponseDto])
  data: CandidateGraphqlResponseDto[];
}
