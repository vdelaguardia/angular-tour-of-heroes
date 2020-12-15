import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Hero } from "../hero";
import { getHeroesRequest } from "../state/heroes.actions";
import { getHeroesSelector } from "../state/heroes.selectors";

@Component({
    selector: 'app-heroes-container',
    template: `
        <app-heroes 
            [heroes]="heroes | async">
        </app-heroes>
    `
  })
  
export class HeroesContainerComponent {
    heroes: Observable<Array<Hero>>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(getHeroesRequest());
        this.heroes = this.store.select(getHeroesSelector);
    }
}