import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Result } from 'oxide.ts';
import { ResponseBase } from '../../../../libs/api/response.base';
import { Paginated } from '../../../../libs/ddd';
import { PaginatedParams } from '../../../../libs/ddd/query.base';
import { CandidateModel } from '../../database/candidate.repository';
import { CandidatePaginatedGraphqlResponseDto } from '../../dtos/graphql/candidates.paginated-gql-response.dto';
import { ListCandidatesQuery } from './list-candidates.query-handler';
import { ListCandidatesGqlRequestDto } from './list-candidates.gql-request.dto';

@Resolver()
export class ListCandidatesGraphqlResolver {
  constructor(private readonly queryBus: QueryBus) {}
  @Query(() => CandidatePaginatedGraphqlResponseDto)
  async listCandidates(
    @Args('options', { type: () => ListCandidatesGqlRequestDto })
    options: PaginatedParams<ListCandidatesQuery>,
  ): Promise<CandidatePaginatedGraphqlResponseDto> {
    const query = new ListCandidatesQuery(options);
    const result: Result<
      Paginated<CandidateModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    const response = new CandidatePaginatedGraphqlResponseDto({
      ...paginated,
      data: paginated.data.map((candidate) => {
        return { ...new ResponseBase(candidate), ...candidate };
      }),
    });

    return response;
  }
}
