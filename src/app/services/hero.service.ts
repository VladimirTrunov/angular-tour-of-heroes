import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { ILogger, Logger } from '../Logger';
import { IErrorHandler, ErrorHandler } from '../errorHandler';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private logger!: ILogger;
  private errorHandler!: IErrorHandler;

  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) {
    this.logger = new Logger(this.messageService, 'HeroService');
    this.errorHandler = new ErrorHandler(this.logger);
  }

  public getHeroes = (): Observable<Hero[]> => {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.logger.log('fetched heroes')),
        catchError(this.errorHandler.handleError<Hero[]>('getHeroes', []))
      );
  }

  public getHero = (id: number): Observable<Hero> => {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.logger.log(`fetched hero id=${id}`)),
      catchError(this.errorHandler.handleError<Hero>(`getHero id=${id}`, undefined))
    );
  }

  public updateHero = (hero: Hero): Observable<any> => {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.logger.log(`updated hero id=${hero.id}`)),
      catchError(this.errorHandler.handleError<any>('updateHero', undefined))
    );
  }

  public addHero = (hero: Hero): Observable<Hero> => {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.logger.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.errorHandler.handleError<Hero>('addHero', undefined))
    );
  }

  public deleteHero = (id: number): Observable<Hero> => {
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.logger.log(`deleted hero id=${id}`)),
      catchError(this.errorHandler.handleError<Hero>('deleteHero', undefined))
    );
  }

  public searchHeroes = (term: string): Observable<Hero[]> => {
    if(!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.logger.log(`found heroes matching "${term}"`) : this.logger.log(`no heroes matching "${term}"`)),
      catchError(this.errorHandler.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
