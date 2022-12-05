import { Observable, of } from 'rxjs';
import { ILogger } from './Logger';

export interface IErrorHandler {
  handleError: <T>(operation:string, result?: T) => (error: any) => Observable<T>
}

export class ErrorHandler implements IErrorHandler {
  private logger!: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public handleError = <T>(operation:string = 'operation', result?: T) => {
    return (error: any): Observable<T> => {
      console.error(error);
      this.logger.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
