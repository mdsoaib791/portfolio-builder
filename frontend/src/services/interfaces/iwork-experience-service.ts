import Response from '@/dtos/response-dto';
import { WorkExperienceListParams } from '@/params/work-experience.params';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';
import { WorkExperienceModel } from '@/models/work-experience-model';
import { AxiosResponse } from 'axios';

export default interface IWorkExperienceService {
    getAll(p: WorkExperienceListParams): Promise<AxiosResponse<Response<WorkExperienceDto[]>>>;
    getById(id: number): Promise<AxiosResponse<Response<WorkExperienceDto>>>;
    add(model: WorkExperienceModel): Promise<AxiosResponse<Response<WorkExperienceDto>>>;
    update(id: number, model: WorkExperienceModel): Promise<AxiosResponse<Response<WorkExperienceDto>>>;
    delete(id: number): Promise<AxiosResponse<Response<WorkExperienceDto>>>;
}