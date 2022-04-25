import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { GroupModel } from '../models/Group';

import { GroupService } from './group.service';

describe('GroupService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GroupService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new GroupService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('#create should return value from observable', (done: DoneFn) => {
    let expectedResult: GroupModel = new GroupModel({ id: 1, name: 'GSA', tournamentId: 1 });
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.create(new GroupModel({ name: 'GSA', tournamentId: 1 })).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getByType should return value from observable', (done: DoneFn) => {
    let expectedResult: GroupModel[] = [];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getByType(1, 'GS%').subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getByTournamentId should return value from observable', (done: DoneFn) => {
    let expectedResult: GroupModel[] = [];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getByTournamentId(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

});
