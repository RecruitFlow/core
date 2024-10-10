import { ResponseBase } from '@libs/api/response.base';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import {
  WorkTime,
  WorkLocation,
} from '@modules/candidate/domain/candidate.types';

@ObjectType()
export class CandidateGraphqlResponseDto extends ResponseBase {
  @Field({
    description: 'Candidate identifier',
  })
  id: string;

  @Field({
    description: 'Candidate name',
    nullable: true,
  })
  name: string;

  @Field({
    description: "Campaign's identifier",
  })
  campaignId: string;

  @Field({
    description: "Candidate's age",
    nullable: true,
  })
  age: number;

  @Field({
    description: "Candidate's work location",
    nullable: true,
  })
  @IsEnum(WorkLocation)
  workLocation: WorkLocation;

  @Field({
    description: "Candidate's work time",
    nullable: true,
  })
  @IsEnum(WorkTime)
  workTime: WorkTime;

  @Field({
    description: "Candidate's position",
    nullable: true,
  })
  position: string;

  @Field({
    description: "Candidate's salary",
    nullable: true,
  })
  salary: number;

  @Field(() => [String], {
    description: "Candidate's skills",
  })
  skills: string[];

  @Field({
    description: "Candidate's location",
    nullable: true,
  })
  location: string;

  @Field(() => [String], {
    description: "Candidate's languages",
  })
  languages: string[];

  @Field({
    description: "Candidate's years of experience",
    nullable: true,
  })
  yearsOfExperience: number;
}
