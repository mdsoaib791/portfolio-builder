import { GeneratePortfolioModel, GeneratedPortfolioResponseDTO } from '../dtos/generate-portfolio.dto';
import { IPortfolioRepository } from './interfaces/iportfolio.repository';

export class PortfolioRepository implements IPortfolioRepository {
  async generatePortfolioWithAI(model: GeneratePortfolioModel): Promise<GeneratedPortfolioResponseDTO> {
    // Prepare prompt for Ollama LLM
    const prompt = `
You are an AI that generates realistic portfolio data for a web application.

Given the following context, extract and generate the following objects using the placeholders below:

{userDto}
{skillDto[]}
{projectDto[]}
{workExperienceDto[]}

Input Context: ${model.prompt}

Validate that all required fields for each object are present and plausible.
If any field is missing, unclear, or implausible, respond with a message indicating which field(s) need clarification or more detail.

Respond ONLY with either:
1. A valid JSON object containing:
{
  userDto: { ... },
  skillDto: [ ... ],
  projectDto: [ ... ],
  workExperienceDto: [ ... ],
  profileDescription: "..."
}
OR
2. A message requesting the missing or unclear information.
`;
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model: 'llama3' })
    });
    const data = await response.json();
    // Expect LLM to return all fields in structured format
    return {
      profileDescription: data.profileDescription,
      user: data.user,
      skills: data.skills,
      projects: data.projects,
      workExperience: data.workExperience,
    };
  }
}
