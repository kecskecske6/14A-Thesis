import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MatchModel } from '../models/Match';

import { MatchService } from './match.service';

describe('MatchService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: MatchService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new MatchService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getByType should return value from observable', (done: DoneFn) => {
    let expectedResult: MatchModel[] = [];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getByType(1, 'GS%').subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getMatchById should return value from observable', (done: DoneFn) => {
    let expectedResult: MatchModel = new MatchModel();
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getMatchById(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getByTournamentId should return value from observable', (done: DoneFn) => {
    let expectedResult: MatchModel[] = [];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getByTournamentId(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#sendMatchReport should return value from observable', (done: DoneFn) => {
    let expectedResult = {
      "message": "Siekres"
    };
    httpClientSpy.put.and.returnValue(of(expectedResult));
    service.sendMatchReport(new MatchModel({
      "id": 1,
      "team1Id": 1,
      "team2Id": 2,
      "refereeId": 1,
      "team1Goals": 0,
      "team2Goals": 0,
      "code": "GSA1-1",
      "groupId": 1
    })).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#sendEvents should return value from observable', (done: DoneFn) => {
    let expectedResult = {
      "message": "Sikeres"
    };
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.sendEvents([
      {
        "id": 1,
        "matchId": 1,
        "playerId": 1,
        "type": "goal",
        "minute": 1
      }
    ]).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#create should return value from observable', (done: DoneFn) => {
    let expectedResult: MatchModel = new MatchModel({
      id: 1,
      team1Id: 1,
      team2Id: 2,
      refereeId: 1,
      team1Goals: null,
      team2Goals: null,
      code: 'GSA1-1',
      groupId: 1
    });
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.create(new MatchModel({
      "team1Id": 1,
      "team2Id": 2,
      "refereeId": 1,
      "team1Goals": null,
      "team2Goals": null,
      "code": "GSA1-1",
      "groupId": 1
    })).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

});
