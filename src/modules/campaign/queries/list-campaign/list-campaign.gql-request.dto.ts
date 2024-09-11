import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsEnum } from 'class-validator';

@InputType()
export class OrderBy {
  @Field()
  readonly field: string;

  @Field()
  @IsEnum(['asc', 'desc'])
  readonly param: 'asc' | 'desc';
}

@InputType()
export class Filter {
  @Field()
  readonly id: string;

  @Field(() => [String])
  @IsArray()
  readonly value: string[];
}

@ArgsType()
@InputType()
export class ListCampaignGqlRequestDto {
  @Field()
  @IsNumber()
  readonly limit: number;

  @Field()
  @IsNumber()
  readonly offset: number;

  @Field(() => [Filter])
  readonly filters: Filter[];

  @Field(() => OrderBy, { nullable: true })
  readonly orderBy: OrderBy;
}
