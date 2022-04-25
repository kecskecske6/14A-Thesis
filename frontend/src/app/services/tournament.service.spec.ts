import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TournamentService } from './tournament.service';

describe('TournamentService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TournamentService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new TournamentService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
