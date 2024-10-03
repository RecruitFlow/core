import { Mapper } from '@libs/ddd';
import { CandidateEntity } from './domain/candidate.entity';
import {
  CandidateModel,
  candidateSchema,
} from './database/candidate.repository';
import { Injectable } from '@nestjs/common';
import { CandidateResponseDto } from './dtos/candidate.response.dto';

@Injectable()
export class CandidateMapper
  implements Mapper<CandidateEntity, CandidateModel, CandidateResponseDto>
{
  toPersistence(entity: CandidateEntity): CandidateModel {
    const copy = entity.getProps();

    const record: CandidateModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
      campaignId: copy.campaignId,
      age: copy.age,
      workTime: copy.workTime,
      workLocation: copy.workLocation,
      salary: copy.salary,
      skills: copy.skills,
      location: copy.location,
      languages: copy.languages,
      yearsOfExperience: copy.yearsOfExperience,
    };

    return candidateSchema.parse(record);
  }

  toDomain(record: CandidateModel): CandidateEntity {
    const entity = new CandidateEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        name: record.name,
        campaignId: record.campaignId,
        age: record.age,
        workTime: record.workTime,
        workLocation: record.workLocation,
        salary: record.salary,
        skills: record.skills,
        location: record.location,
        languages: record.languages,
        yearsOfExperience: record.yearsOfExperience,
      },
    });

    return entity;
  }

  toResponse(entity: CandidateEntity): CandidateResponseDto {
    const props = entity.getProps();

    const response = new CandidateResponseDto(props);

    return response;
  }
}
