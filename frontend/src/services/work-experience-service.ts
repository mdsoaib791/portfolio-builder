import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';

import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';

import IHttpService from './interfaces/ihttp-service';
import IWorkExperienceService from './interfaces/iwork-experience-service';

import Response from '@/dtos/response-dto';
import { WorkExperienceListParams } from '@/params/work-experience.params';
import { WorkExperienceDto } from '@/dtos/work-experience-dto';
import { WorkExperienceModel } from '@/models/work-experience-model';

@injectable()
export default class WorkExperienceService implements IWorkExperienceService {
    private readonly httpService: IHttpService;

    constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
        this.httpService = httpService;
    }

    getAll(p: WorkExperienceListParams): Promise<AxiosResponse<Response<WorkExperienceDto[]>>> {
        return this.httpService.call().get<WorkExperienceDto[], AxiosResponse<Response<WorkExperienceDto[]>>>(`/work-experience`, { params: p });
    }

    getById(id: number): Promise<AxiosResponse<Response<WorkExperienceDto>>> {
        return this.httpService.call().get<WorkExperienceDto, AxiosResponse<Response<WorkExperienceDto>>>(`/work-experience/${id}`);
    }

    add(model: WorkExperienceModel): Promise<AxiosResponse<Response<WorkExperienceDto>>> {
        return this.httpService.call().post<WorkExperienceDto, AxiosResponse<Response<WorkExperienceDto>>>(`/work-experience`, model);
    }

    update(id: number, model: WorkExperienceModel): Promise<AxiosResponse<Response<WorkExperienceDto>>> {
        return this.httpService.call().put<WorkExperienceDto, AxiosResponse<Response<WorkExperienceDto>>>(`/work-experience/${id}`, model);
    }

    delete(id: number): Promise<AxiosResponse<Response<WorkExperienceDto>>> {
        return this.httpService.call().delete<WorkExperienceDto, AxiosResponse<Response<WorkExperienceDto>>>(`/work-experience/${id}`);
    }
}
