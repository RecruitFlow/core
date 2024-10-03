import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class CandidateResponseDto extends ResponseBase {
  @ApiProperty({
    description: "Campaign's identifier",
  })
  id: string;

  @ApiProperty({
    example: 'Alex Vovkovich',
    description: "Candidate's name",
  })
  name: string;

  @ApiProperty({
    example: 'campaignId',
    description: "Campaign's identifier",
  })
  campaignId: string;

  @ApiProperty({
    example: 24,
    description: "Candidate's age",
    nullable: true,
  })
  age?: number;

  @ApiProperty({
    example: 'FULL_TIME',
    description: "Candidate's work time",
  })
  workTime: string;

  @ApiProperty({
    example: 'REMOTE',
    description: "Candidate's work location",
  })
  workLocation: string;

  @ApiProperty({
    example: 'Middle Back-End Developer',
    description: "Candidate's position",
    nullable: true,
  })
  position?: string;

  @ApiProperty({
    example: 1000,
    description: "Candidate's salary",
    nullable: true,
  })
  salary?: number;

  @ApiProperty({
    example: ['JavaScript', 'TypeScript'],
    description: "Candidate's skills",
    isArray: true,
  })
  skills: string[];

  @ApiProperty({
    example: 'Minsk',
    description: "Candidate's location",
    nullable: true,
  })
  location?: string;

  @ApiProperty({
    example: ['English', 'Russian'],
    description: "Candidate's languages",
    isArray: true,
    nullable: true,
  })
  languages?: string[];

  @ApiProperty({
    example: 2,
    description: "Candidate's years of experience",
    nullable: true,
  })
  yearsOfExperience?: number;

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
/**
 * name              String?      @default("Unspecified")
  campaignId        String
  age               Int?         @default(0)
  workTime          WorkTime     @default(UNDEFINED)
  workLocation      WorkLocation @default(UNDEFINED)
  position          String?      @default("Unspecified")
  salary            Int?         @default(0)
  skills            String[]
  location          String?
  languages         String[]
  yearsOfExperience Int?         @default(0)
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
 */
