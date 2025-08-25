import { injectable } from 'inversify';
import IMiscellaneousService from './interfaces/imiscellaneous-service';

@injectable()
export default class MiscellaneousService implements IMiscellaneousService {
  trimValue(content: string, maxLength: number, appendText: string = ''): string {
    try {
      if (!content || content.trim().length === 0) return '';

      if (content.length < maxLength) return content;

      const words: string[] = content.split(' ');
      let totalCharacters: number = 0;
      const summaryWords: string[] = [];

      for (const word of words) {
        summaryWords.push(word);
        totalCharacters += word.length + 1;
        if (totalCharacters > maxLength) break;
      }

      const summary: string = summaryWords.join(' ') + (appendText.trim() === '' ? '' : '...');

      return summary;
    } catch {
      return content;
    }
  }

  getInitials(name: string): string {
    if (!name) return '';

    const words = name.split(' ');
    let initials = '';

    if (words.length > 0) {
      initials += (words[0][0] || '').toUpperCase();
    }

    if (words.length > 1) {
      initials += (words[words.length - 1][0] || '').toUpperCase();
    }

    return initials;
  }

  getUniqueItems<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
  }

  getUniqueItemsByKey<T, K extends keyof T>(arr: T[], key: K): T[] {
    const map = new Map(arr.map((item) => [item[key], item]));
    return Array.from(map.values());
  }

  getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    const fileExtension = (parts.length > 1 ? parts.pop() || '' : '').toLowerCase();

    return fileExtension;
  }
}
