import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
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
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    service = new HeroService(httpClient, messageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes', () => {
    const expectedHeroes: Array<Hero> = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
    ];

    service.getHeroes().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes));
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedHeroes);
  });

  it('should get hero', () => {
    const expectedHero: Hero = { id: 11, name: 'Dr Nice' };

    service.getHero(11).subscribe((hero) => expect(hero).toEqual(expectedHero));
    const req = httpTestingController.expectOne('api/heroes/11');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedHero);
  });

  it('should update hero', () => {
    const updatedHero: Hero = { id: 11, name: 'Dr Nice' };

    service.updateHero(updatedHero).subscribe((hero) => expect(hero).toEqual(updatedHero));
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: updatedHero });
    req.event(expectedResponse);
  });

  it('should add hero', () => {
    const addedHero: Hero = { id: 100, name: 'Dr Mean' };

    service.addHero(addedHero).subscribe((hero) => expect(hero).toEqual(addedHero));
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');

    const expectedResponse = new HttpResponse(
      { status: 201, statusText: 'Created', body: addedHero });
    req.event(expectedResponse);
  });

  it('should delete hero', () => {
    const deleteHero: Hero = { id: 100, name: 'Dr Mean' };

    service.deleteHero(deleteHero).subscribe((hero) => expect(hero).toEqual(deleteHero));
    const req = httpTestingController.expectOne('api/heroes/100');
    expect(req.request.method).toEqual('DELETE');

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: deleteHero });
    req.event(expectedResponse);
  });

  it('should return correct search results', () => {
    const heroes: Array<Hero> = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Gabe'},
      { id: 14, name: 'Victoria'},
      { id: 15, name: 'Sam'}
    ];

    service.searchHeroes('nice').subscribe((result) => expect(result).toEqual([{ id: 11, name: 'Dr Nice' }]));
    const req = httpTestingController.expectOne('api/heroes/?name=nice');
    expect(req.request.method).toEqual('GET');
    req.flush([heroes[0]]);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get<Array<Hero>>('/data').subscribe(
      (data) => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne('/data');

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
