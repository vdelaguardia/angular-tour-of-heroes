import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getHeroesRequest } from '../state/heroes.actions';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<any> {

  constructor(private store: Store) { }

  resolve(): Observable<void> {
    this.store.dispatch(getHeroesRequest());
    return of();
  }
}
