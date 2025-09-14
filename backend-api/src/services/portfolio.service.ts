import { inject } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { GeneratePortfolioModel, GeneratedPortfolioResponseDTO } from '../dtos/generate-portfolio.dto';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { IPortfolioService } from './interfaces/iportfolio.service';

export class PortfolioService implements IPortfolioService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async generatePortfolioWithAI(model: GeneratePortfolioModel): Promise<GeneratedPortfolioResponseDTO> {
    return this.unitOfWork.Portfolio.generatePortfolioWithAI(model);
  }
}
