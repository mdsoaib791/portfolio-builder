import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';

export function useUnitOfService(): IUnitOfService {
    return container.get<IUnitOfService>(TYPES.IUnitOfService);
}
