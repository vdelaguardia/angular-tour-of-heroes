import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { addHeroRequest } from '../state/heroes.actions';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})

export class HeroesComponent implements OnInit {

  @Input('heroes') heroes: Array<Hero> = new Array<Hero>();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(addHeroRequest({heroName: name}));
  }

  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
  }
}
