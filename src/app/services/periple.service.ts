import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Periple } from '../shared/models/network';

@Injectable({
  providedIn: 'root'
})
export class PeripleService {

  constructor() { }

  private periples$: BehaviorSubject<Periple[]> = new BehaviorSubject([] as Periple[]);

  public getPeriples = (): Observable<Periple[]> => {
    return this.periples$.asObservable();
  }

  public setPeriples = (periples: Periple[]): void => {
    this.periples$.next(periples);
  }

  public getPeriple = (peripleId: string): Observable<Periple> => {
    return this.getPeriples().pipe(map(periples => periples.find(per => per.id === peripleId) as Periple));
  }
}
