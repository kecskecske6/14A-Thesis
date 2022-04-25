import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { DrawService } from './draw.service';

describe('DrawService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: DrawService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new DrawService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#create should return value from observable', (done: DoneFn) => {
    let expectedResult = [
      {
        "id": 81,
        "refereeId": 4,
        "team1Goals": null,
        "team2Goals": null,
        "code": "QF1-1",
        "groupId": 32,
        "team1Id": 4,
        "team2Id": 6
      },
      {
        "id": 82,
        "refereeId": 6,
        "team1Goals": null,
        "team2Goals": null,
        "code": "QF2-1",
        "groupId": 33,
        "team1Id": 5,
        "team2Id": 8
      },
      {
        "id": 83,
        "refereeId": 3,
        "team1Goals": null,
        "team2Goals": null,
        "code": "QF3-1",
        "groupId": 34,
        "team1Id": 1,
        "team2Id": 2
      },
      {
        "id": 84,
        "refereeId": 1,
        "team1Goals": null,
        "team2Goals": null,
        "code": "QF4-1",
        "groupId": 35,
        "team1Id": 7,
        "team2Id": 3
      }
    ];
    httpClientSpy.post.and.returnValue(of(expectedResult));
    service.create({
      "id": 1,
      "organizerId": 6,
      "startDate": new Date("2022-04-01 15:36:06"),
      "endDate": new Date("2022-04-03 21:44:29"),
      "name": "voluptate",
      "location": "910 Issac Alley\nWest Keyshawnstad, MO 78668-5486",
      "county": "Tolna",
      "bestPlayer": null,
      "topScorer": null,
      "bestGoalkeeper": null,
      "entryFee": 28470,
      "description": "Quasi tempora quod laboriosam omnis repudiandae qui. Deleniti quo corporis occaecati assumenda. Nam facilis numquam sequi tenetur. Voluptatem aspernatur tempora rerum labore nesciunt. Eum incidunt est voluptatem nisi eos velit. Enim fuga sed reprehenderit perspiciatis nam omnis. Aperiam beatae culpa magni et adipisci ut. Quasi tempora cumque sed pariatur illum. Ut aut qui qui soluta et. Optio ea quae enim possimus omnis. Fugit itaque impedit consequatur iste voluptas nihil. Molestiae ullam excepturi laudantium dolor consequatur. Libero voluptatem quae dolorem voluptatem maiores quia. Quibusdam aliquid repellendus neque in quo. Vel nobis quos est nemo. Aspernatur dolor enim ea et eum dolore reprehenderit. Voluptas quod aspernatur iste a neque magni. Rerum ipsum voluptatem tenetur. Quisquam voluptatibus et id. Corrupti neque maxime rerum iste consequuntur modi ipsum. Nam possimus incidunt voluptatem necessitatibus sapiente voluptatem iure.",
      "teamsCount": 8,
      "type": "Egyenes kieséses",
      "groupMatches": 1,
      "knockoutMatches": 1,
      "finalMatches": 1
    }, [
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
    ]).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

});
