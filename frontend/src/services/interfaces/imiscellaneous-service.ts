export default interface IMiscellaneousService {
  trimValue(content: string, maxLength: number, appendText: string): string;
  getInitials(name: string): string;
  getUniqueItems<T>(arr: T[]): T[];
  getUniqueItemsByKey<T, K extends keyof T>(arr: T[], key: K): T[];
  getFileExtension(fileName: string): string;
}
