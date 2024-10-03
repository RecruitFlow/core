import { ApiProperty } from '@nestjs/swagger';
import {
  WorkTime,
  WorkLocation,
} from '@modules/candidate/domain/candidate.types';
import {
  IsString,
  Matches,
  MaxLength,
  IsNumber,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateCandidateRequestDto {
  @ApiProperty({
    example: 'Alex Somebody',
    description: 'Candidate Name',
  })
  @MaxLength(64)
  @MinLength(6)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly name: string;

  @ApiProperty({
    example: 'campaignId',
    description: 'Campaign Identifier',
  })
  @IsString()
  readonly campaignId: string;

  @ApiProperty({
    example: 24,
    description: 'Candidate Age',
  })
  @IsString()
  @IsOptional()
  readonly age: number;

  @ApiProperty({
    example: 'FULL_TIME',
    description: 'Candidate Work Time',
  })
  @IsEnum(WorkTime)
  readonly workTime: WorkTime;

  @ApiProperty({
    example: 'REMOTE',
    description: 'Candidate Work Location',
  })
  @IsEnum(WorkLocation)
  readonly workLocation: WorkLocation;

  @ApiProperty({
    example: 'Middle Back-End Developer',
    description: 'Candidate Position',
  })
  @IsString()
  @IsOptional()
  readonly position: string;

  @ApiProperty({
    example: 1000,
    description: 'Candidate Salary',
  })
  @IsOptional()
  @IsNumber()
  readonly salary: number;

  @ApiProperty({
    example: ['JavaScript', 'TypeScript'],
    description: 'Candidate Skills',
  })
  @IsString({ each: true })
  readonly skills: string[];

  @ApiProperty({
    example: 'New York',
    description: 'Candidate Location',
  })
  @IsString()
  @IsOptional()
  readonly location: string;

  @ApiProperty({
    example: ['English', 'Russian'],
    description: 'Candidate Languages',
  })
  @IsString({ each: true })
  @IsOptional()
  readonly languages: string[];

  @ApiProperty({
    example: 2,
    description: 'Years of Experience',
  })
  @IsNumber()
  @IsOptional()
  readonly yearsOfExperience: number;
}
