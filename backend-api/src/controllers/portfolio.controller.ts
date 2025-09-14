import { Request, Response } from 'express';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { GeneratePortfolioModel } from '../dtos/generate-portfolio.dto';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { validateGeneratePortfolio } from '../validators/generate-portfolio.validator';

export class PortfolioController {

  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  async generateAI(req: Request, res: Response) {
    const validation = validateGeneratePortfolio(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.message });
    }
    const model: GeneratePortfolioModel = req.body;
    try {
      const result = await this.unitOfService.Portfolio.generatePortfolioWithAI(model);
      return res.json(result);
    } catch (err) {
      const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : 'Internal server error';
      return res.status(500).json({ error: errorMessage });
    }
  }
}
