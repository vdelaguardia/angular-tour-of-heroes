import { createReducer, on } from '@ngrx/store';
import { Hero } from '../hero';
import { addHeroResponse, getHeroesResponse } from './heroes.actions';

export const initialState = new Array<Hero>();

export const heroesReducer = createReducer(
    initialState,
    on(getHeroesResponse, (_, action) => action.heroes),
    on(addHeroResponse, (state, action) => [...state, action.hero])
);