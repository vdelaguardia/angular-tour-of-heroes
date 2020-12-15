import { createAction, props } from '@ngrx/store';
import { Hero } from '../hero';


// add hero
export const addHeroRequest = createAction(
    '[Heroes/API] Add Hero Request',
    props<{ heroName: string }>()
);

// add hero response
export const addHeroResponse = createAction(
    '[Heroes/API] Add Hero Response',
    props<{ hero: Hero }>()
);

// get hero
export const getHero = createAction(
    '[Hero Detail] Get Hero',
    props<{ heroId: number }>()
);

// get heroes
export const getHeroesRequest = createAction(
    '[Heroes/API] Get Heroes Request',
);

export const getHeroesResponse = createAction(
    '[Heroes/API] Get Heroes Response',
    props<{ heroes: Array<Hero> }>()
);

// delete hero
// update hero
// search hero