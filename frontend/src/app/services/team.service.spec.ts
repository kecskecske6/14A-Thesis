import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TeamModel } from '../models/Team';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: TeamService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new TeamService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllByTournamentId should return value from observable', (done: DoneFn) => {
    let expectedResult: TeamModel[] = [
      {
        "id": 1,
        "leaderId": 1,
        "name": "saepe"
      },
      {
        "id": 2,
        "leaderId": 6,
        "name": "autem"
      },
      {
        "id": 3,
        "leaderId": 4,
        "name": "sit"
      },
      {
        "id": 4,
        "leaderId": 1,
        "name": "alias"
      },
      {
        "id": 5,
        "leaderId": 3,
        "name": "sed"
      },
      {
        "id": 6,
        "leaderId": 3,
        "name": "dolor"
      },
      {
        "id": 7,
        "leaderId": 2,
        "name": "commodi"
      },
      {
        "id": 8,
        "leaderId": 2,
        "name": "vel"
      }
    ];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getAllByTournamentId(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#registerTeam should return value from observable', (done: DoneFn) => {
    let expectedResult = {
      "message": "Sikeres regisztráció!"
    };
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.registerTeam({
      "leaderId": 1,
      "tournamentId": 1,
      "teamName": "TestTeam",
      "players": [
        {
          "name": "Teszt Elek1",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 1,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek2",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 2,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek3",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 3,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek4",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 4,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek5",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 5,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek6",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 6,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek7",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 7,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        },
        {
          "name": "Teszt Elek8",
          "goals": 0,
          "yellowCards": 0,
          "redCards": 0,
          "kitNumber": 8,
          "number_of_goals_in_a_match": [],
          "number_of_yellows_in_a_match": [],
          "redCard": 0
        }
      ]
    }).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

});
