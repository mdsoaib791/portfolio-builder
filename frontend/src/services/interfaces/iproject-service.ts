import Response from '@/dtos/response-dto';
import { ListResponseDto } from '@/dtos/list-response-dto';
import { ProjectListParams } from '@/params/project.params';
import { ProjectDto } from '@/dtos/project-dto';
import { ProjectModel } from '@/models/project-model';
import { AxiosResponse } from 'axios';

export default interface IProjectService {
    getAll(p: ProjectListParams): Promise<AxiosResponse<Response<ListResponseDto<ProjectDto>>>>;
    getById(id: number): Promise<AxiosResponse<Response<ProjectDto>>>;
    add(model: ProjectModel): Promise<AxiosResponse<Response<ProjectDto>>>;
    update(id: number, model: ProjectModel): Promise<AxiosResponse<Response<ProjectDto>>>;
    delete(id: number): Promise<AxiosResponse<Response<ProjectDto>>>;
}
