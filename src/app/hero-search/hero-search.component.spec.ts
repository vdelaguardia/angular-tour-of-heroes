import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroesComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let getHeroesSpy: jasmine.Spy;
  let heroes: Array<Hero>;

  beforeEach(() => {
    heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' }
    ];

    const heroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    getHeroesSpy = heroService.searchHeroes.and.returnValue(of(heroes));

    TestBed.configureTestingModule({
      declarations: [
        HeroSearchComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroService } ]
    });

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
