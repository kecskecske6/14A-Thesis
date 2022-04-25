import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TeamstoGroupsModel } from '../models/TeamstoGroups';

import { TeamstoGroupsService } from './teamsto-groups.service';

describe('TeamstoGroupsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TeamstoGroupsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new TeamstoGroupsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#create should return value from observable', (done: DoneFn) => {
    let expectedResult: TeamstoGroupsModel = new TeamstoGroupsModel({ id: 1, teamId: 1, groupId: 1 });
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.create(new TeamstoGroupsModel({ teamId: 1, groupId: 1 })).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getByTournamentId should return value from observable', (done: DoneFn) => {
    let expectedResult: TeamstoGroupsModel[] = [];
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
