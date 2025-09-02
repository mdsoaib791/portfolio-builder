import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';

import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';

import IHttpService from './interfaces/ihttp-service';
import IProjectService from './interfaces/iproject-service';

import Response from '@/dtos/response-dto';
import { ListResponseDto } from '@/dtos/list-response-dto';
import { ProjectListParams } from '@/params/project.params';
import { ProjectDto } from '@/dtos/project-dto';
import { ProjectModel } from '@/models/project-model';

@injectable()
export default class ProjectService implements IProjectService {
    private readonly httpService: IHttpService;

    constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
        this.httpService = httpService;
    }

    getAll(p: ProjectListParams): Promise<AxiosResponse<Response<ListResponseDto<ProjectDto>>>> {
        return this.httpService.call().get<ListResponseDto<ProjectDto>, AxiosResponse<Response<ListResponseDto<ProjectDto>>>>(`/projects`, { params: p });
    }

    getById(id: number): Promise<AxiosResponse<Response<ProjectDto>>> {
        return this.httpService.call().get<ProjectDto, AxiosResponse<Response<ProjectDto>>>(`/projects/${id}`);
    }

    add(model: ProjectModel): Promise<AxiosResponse<Response<ProjectDto>>> {
        return this.httpService.call().post<ProjectDto, AxiosResponse<Response<ProjectDto>>>(`/projects`, model);
    }

    update(id: number, model: ProjectModel): Promise<AxiosResponse<Response<ProjectDto>>> {
        return this.httpService.call().put<ProjectDto, AxiosResponse<Response<ProjectDto>>>(`/projects/${id}`, model);
    }

    delete(id: number): Promise<AxiosResponse<Response<ProjectDto>>> {
        return this.httpService.call().delete<ProjectDto, AxiosResponse<Response<ProjectDto>>>(`/projects/${id}`);
    }
}
