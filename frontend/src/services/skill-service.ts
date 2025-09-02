import { AxiosResponse } from 'axios';
import { injectable } from 'inversify';

import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';

import IHttpService from './interfaces/ihttp-service';
import ISkillService from './interfaces/iskill-service';

import { ListResponseDto } from '@/dtos/list-response-dto';
import Response from '@/dtos/response-dto';
import { SkillDto } from '@/dtos/skill-dto';
import { SkillModel } from '@/models/skill-model';
import { SkillListParams } from '@/params/skill.params';

@injectable()
export default class SkillService implements ISkillService {
    private readonly httpService: IHttpService;

    constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
        this.httpService = httpService;
    }

    getAll(p: SkillListParams): Promise<AxiosResponse<Response<ListResponseDto<SkillDto[]>>>> {
        return this.httpService.call().get<ListResponseDto<SkillDto[]>, AxiosResponse<Response<ListResponseDto<SkillDto[]>>>>(`/skills`, { params: p });
    }

    getById(id: number): Promise<AxiosResponse<Response<SkillDto>>> {
        return this.httpService.call().get<SkillDto, AxiosResponse<Response<SkillDto>>>(`/skills/${id}`);
    }
    getByUserId(userId: string): Promise<AxiosResponse<Response<SkillDto[]>>> {
        return this.httpService.call().get<SkillDto[], AxiosResponse<Response<SkillDto[]>>>(`/skills/user/${userId}`);
    }

    add(model: SkillModel): Promise<AxiosResponse<Response<SkillDto>>> {
        return this.httpService.call().post<SkillDto, AxiosResponse<Response<SkillDto>>>(`/skills`, model);
    }

    update(id: number, model: SkillModel): Promise<AxiosResponse<Response<SkillDto>>> {
        return this.httpService.call().put<SkillDto, AxiosResponse<Response<SkillDto>>>(`/skills/${id}`, model);
    }

    delete(id: number): Promise<AxiosResponse<Response<SkillDto>>> {
        return this.httpService.call().delete<SkillDto, AxiosResponse<Response<SkillDto>>>(`/skills/${id}`);
    }
}
