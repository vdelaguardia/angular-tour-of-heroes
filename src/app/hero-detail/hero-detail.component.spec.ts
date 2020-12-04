import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let getHeroSpy: jasmine.Spy;
  // let getHeroIdSpy: jasmine.Spy;
  let hero: Hero;
  // let id: number;

  beforeEach(() => {
    hero = { id: 11, name: 'Dr Nice' };
    // id = 11;
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    getHeroSpy = heroServiceSpy.getHero.and.returnValue(of(hero));
    // getHeroIdSpy =  activatedRouteSpy.snapshot.and.returnValue(of(id));

    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        Location,
        { provide: ActivatedRoute, useValue: activatedRouteSpy},
        { provide: HeroService, useValue: heroServiceSpy } ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
