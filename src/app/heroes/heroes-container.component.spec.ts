import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeroesContainerComponent } from './heroes-container.component';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesContainerComponent;
  let fixture: ComponentFixture<HeroesContainerComponent>;
  let heroes: Array<Hero>;

  let store: MockStore;
  const initialState = new Array<Hero>();


  beforeEach(() => {
    heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' }
    ];

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroesContainerComponent
      ],
      providers: [
        provideMockStore({ initialState }) ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeroesContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});