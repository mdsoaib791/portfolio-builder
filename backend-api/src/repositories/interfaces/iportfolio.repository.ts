import { GeneratePortfolioModel, GeneratedPortfolioResponseDTO } from '../../dtos/generate-portfolio.dto';

export interface IPortfolioRepository {
  generatePortfolioWithAI(model: GeneratePortfolioModel): Promise<GeneratedPortfolioResponseDTO>;
}
