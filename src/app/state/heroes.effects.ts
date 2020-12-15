import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { addHeroRequest, addHeroResponse, getHeroesRequest, getHeroesResponse } from './heroes.actions';

@Injectable()
export class HeroEffects {
    constructor( 
        private actions$: Actions,
        private heroService: HeroService
    ){}

    getHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(getHeroesRequest),
        switchMap( () => this.heroService.getHeroes()
            .pipe(
                map(heroes => getHeroesResponse({heroes}))
            ))
    ))

    addHero$ = createEffect(() => this.actions$.pipe(
        ofType(addHeroRequest),
        exhaustMap( action => this.heroService.addHero( { name: action.heroName } as Hero )
            .pipe(
                map( hero => addHeroResponse({hero}) )
            )
        )
    ));

}