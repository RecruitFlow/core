import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, Matches, IsOptional } from 'class-validator';

export class ListCampaignRequestDto {
  @ApiProperty({
    example: 'Middle Fullstack',
    description: 'Campaign name',
  })
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly name?: string;
}
