import { GeneratePortfolioDTO, GeneratedPortfolioResponseDTO } from '../../dtos/generate-portfolio.dto';

export interface IPortfolioService {
  generatePortfolioWithAI(dto: GeneratePortfolioDTO): Promise<GeneratedPortfolioResponseDTO>;
}
