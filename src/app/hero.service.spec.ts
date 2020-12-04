import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    service = new HeroService(httpClient, messageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes', () => {
    const expectedHeroes: Array<Hero> = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' }
    ];
    httpClient.get<Array<Hero>>('/data')
      .subscribe( heroes =>
        expect(heroes).toEqual(expectedHeroes)
      );

    const req = httpTestingController.expectOne('/data');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedHeroes);

    httpTestingController.verify();
  });

});
