import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

import {
  // Filter,
  OrderBy,
} from '@modules/campaign/queries/list-campaign/list-campaign.gql-request.dto';

// @InputType()
// export class OrderBy {
//   @Field()
//   readonly field: string;

//   @Field()
//   @IsEnum(['asc', 'desc'])
//   readonly param: 'asc' | 'desc';
// }

// @InputType()
// export class Filter {
//   @Field()
//   readonly id: string;

//   @Field(() => [String])
//   @IsArray()
//   readonly value: string[];
// }

@ArgsType()
@InputType()
export class ListCandidatesGqlRequestDto {
  @Field()
  @IsNumber()
  readonly limit: number;

  @Field()
  @IsNumber()
  readonly offset: number;

  // @Field(() => [Filter])
  // readonly filters: Filter[];

  @Field(() => OrderBy, { nullable: true })
  readonly orderBy: OrderBy;
}
