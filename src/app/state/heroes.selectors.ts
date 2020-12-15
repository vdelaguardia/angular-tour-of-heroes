import { createSelector } from '@ngrx/store';
import { Hero } from '../hero';
import { AppState } from './app.state';

export const getHeroesSelector = createSelector(
    (state: AppState) => state.heroes,
    (heroes: Array<Hero>) => heroes
);