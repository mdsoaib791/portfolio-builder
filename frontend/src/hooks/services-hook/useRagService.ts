import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';
import IRagService from '@/services/interfaces/irag-service';

export function useRagService(): IRagService {
    return container.get<IRagService>(TYPES.IRagService);
}
