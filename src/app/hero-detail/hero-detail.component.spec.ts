import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { SpyLocation } from '@angular/common/testing';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let getHeroSpy: jasmine.Spy;
  let hero: Hero;

  beforeEach(() => {
    hero = { id: 11, name: 'Dr Nice' };
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero']);
    getHeroSpy = heroServiceSpy.getHero.and.returnValue(of(hero));

    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        { provide: Location, useValue: SpyLocation },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '11'
              })
            }
          }
        },
        { provide: HeroService, useValue: heroServiceSpy } ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get hero on init', () => {
    expect(component.hero).toBeFalsy();
    component.ngOnInit();
    expect(getHeroSpy.calls.any()).toBeTrue();
    expect(component.hero).toBeTruthy();
  });

  it('hero div should exist in DOM', () => {
    fixture.detectChanges();
    const heroDetailElement: HTMLElement = fixture.nativeElement;
    const heroDiv = heroDetailElement.querySelector('div');
    expect(heroDiv).toBeTruthy();
  });
});
