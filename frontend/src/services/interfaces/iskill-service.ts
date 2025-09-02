import { ListResponseDto } from '@/dtos/list-response-dto';
import Response from '@/dtos/response-dto';
import { SkillDto } from '@/dtos/skill-dto';
import { SkillModel } from '@/models/skill-model';
import { SkillListParams } from '@/params/skill.params';
import { AxiosResponse } from 'axios';

export default interface ISkillService {
    getAll(p: SkillListParams): Promise<AxiosResponse<Response<ListResponseDto<SkillDto[]>>>>;
    getById(id: number): Promise<AxiosResponse<Response<SkillDto>>>;
    getByUserId(userId: string): Promise<AxiosResponse<Response<SkillDto[]>>>;
    add(model: SkillModel): Promise<AxiosResponse<Response<SkillDto>>>;
    update(id: number, model: SkillModel): Promise<AxiosResponse<Response<SkillDto>>>;
    delete(id: number): Promise<AxiosResponse<Response<SkillDto>>>;
}
