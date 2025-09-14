export function validateGeneratePortfolio(data: any): { success: boolean; message?: string } {
  if (!data.intent || data.intent !== 'GENERATE_PORTFOLIO') {
    return { success: false, message: 'Intent must be GENERATE_PORTFOLIO.' };
  }
  if (!data.prompt || typeof data.prompt !== 'string' || data.prompt.trim() === '') {
    return { success: false, message: 'Prompt is required.' };
  }
  return { success: true };
}
