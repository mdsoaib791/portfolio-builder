import axios from 'axios';
import { injectable } from 'inversify';

import IErrorHandlerService from './interfaces/ierror-handler-service';

import Response from '@/dtos/response-dto';
import PlainDto from '@/dtos/plain-dto';

@injectable()
export default class ErrorHandlerService implements IErrorHandlerService {
  constructor() {}

  getErrorMessage(error: any): string {
    try {
      if (axios.isAxiosError(error)) {
        const actualError: Response<any> = error.response?.data;

        if (actualError) {
          if (actualError.errors) return actualError.errors.join('<br/>');
          else if (actualError.data) {
            return actualError.data;
          } else {
            if (process.env.NODE_ENV === 'production') {
              return 'Some error occured';
            } else {
              return actualError as unknown as string;
            }
          }
        }
      } else {
        const castedError = error.data as Response<PlainDto>;
        if (castedError.data) return castedError.errors.join('<br/>');
        else if (castedError.message) return castedError.message;
      }
      return 'Some error occured';
    } catch (err) {
      return 'Some error occured.';
    }
  }
}
