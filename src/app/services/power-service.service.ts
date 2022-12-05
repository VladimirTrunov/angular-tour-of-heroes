import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient } from '@angular/common/http';

import { ILogger, Logger } from '../Logger';
import { IErrorHandler, ErrorHandler } from '../errorHandler';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private powerUrl: string =  "api/power";
  private logger!: ILogger;
  private errorHandler!: IErrorHandler;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    this.logger = new Logger(this.messageService, "PowerService");
    this.errorHandler = new ErrorHandler(this.logger);
  }

  public getPowers = (): Observable<string[]> => {
    return this.httpClient.get<string[]>(this.powerUrl).pipe(
      tap(_ => this.logger.log(`fetched powers`)),
      catchError(this.errorHandler.handleError<string[]>(`fetch powers`, undefined)));
  }
}
