import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PlayerService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PlayerService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPlayersByTournamentId should return value from observable', (done: DoneFn) => {
    let expectedResult: any[] = [
      {
        "id": 1,
        "name": "Prof. Dallas Ratke III",
        "goals": 0
      },
      {
        "id": 2,
        "name": "Miss Eulah Koelpin DVM",
        "goals": 0
      },
      {
        "id": 3,
        "name": "Owen Simonis",
        "goals": 0
      },
      {
        "id": 4,
        "name": "Bailey McGlynn MD",
        "goals": 0
      },
      {
        "id": 5,
        "name": "Carlee Stracke",
        "goals": 0
      },
      {
        "id": 6,
        "name": "Camylle Dicki",
        "goals": 0
      },
      {
        "id": 7,
        "name": "Mrs. Helene Douglas",
        "goals": 0
      },
      {
        "id": 8,
        "name": "Mr. Emmitt Hilpert",
        "goals": 0
      },
      {
        "id": 9,
        "name": "Davonte Homenick",
        "goals": 0
      },
      {
        "id": 10,
        "name": "Ms. Odie Walter",
        "goals": 0
      },
      {
        "id": 11,
        "name": "Loyal Kunze DVM",
        "goals": 0
      },
      {
        "id": 12,
        "name": "Jermain Kling IV",
        "goals": 0
      },
      {
        "id": 13,
        "name": "Mrs. Francisca Abshire MD",
        "goals": 0
      },
      {
        "id": 14,
        "name": "Layla Hyatt",
        "goals": 0
      },
      {
        "id": 15,
        "name": "Dr. Albert Predovic",
        "goals": 0
      },
      {
        "id": 16,
        "name": "Miss Karli Roberts II",
        "goals": 0
      },
      {
        "id": 17,
        "name": "Zackery Crooks",
        "goals": 0
      },
      {
        "id": 18,
        "name": "Reece Turcotte",
        "goals": 0
      },
      {
        "id": 19,
        "name": "Gardner Cummings Sr.",
        "goals": 0
      },
      {
        "id": 20,
        "name": "Mrs. Liza Tromp",
        "goals": 0
      },
      {
        "id": 21,
        "name": "Myrtie Schmidt",
        "goals": 0
      },
      {
        "id": 22,
        "name": "Ericka Kessler",
        "goals": 0
      },
      {
        "id": 23,
        "name": "Kirk Schaden",
        "goals": 0
      },
      {
        "id": 24,
        "name": "Dr. Angelita Kessler DDS",
        "goals": 0
      },
      {
        "id": 25,
        "name": "Mia Sipes DDS",
        "goals": 0
      },
      {
        "id": 26,
        "name": "Leda Jaskolski V",
        "goals": 0
      },
      {
        "id": 27,
        "name": "Raoul Bradtke",
        "goals": 0
      },
      {
        "id": 28,
        "name": "Rupert Okuneva",
        "goals": 0
      },
      {
        "id": 29,
        "name": "Mr. Rodrigo Hamill III",
        "goals": 0
      },
      {
        "id": 30,
        "name": "Ms. Dolly Wolf IV",
        "goals": 0
      },
      {
        "id": 31,
        "name": "Alexie Johnston",
        "goals": 0
      },
      {
        "id": 32,
        "name": "Mr. Anastacio Strosin Jr.",
        "goals": 0
      },
      {
        "id": 33,
        "name": "Mr. Edd Prohaska III",
        "goals": 0
      },
      {
        "id": 34,
        "name": "Leif Hoeger DVM",
        "goals": 0
      },
      {
        "id": 35,
        "name": "Randall Hegmann",
        "goals": 0
      },
      {
        "id": 36,
        "name": "Bobbie Heller",
        "goals": 0
      },
      {
        "id": 37,
        "name": "Arvilla Leannon",
        "goals": 0
      },
      {
        "id": 38,
        "name": "Otis Vandervort",
        "goals": 0
      },
      {
        "id": 39,
        "name": "Wilhelm Hahn",
        "goals": 0
      },
      {
        "id": 40,
        "name": "Beatrice Wyman",
        "goals": 0
      },
      {
        "id": 41,
        "name": "Elian Rowe",
        "goals": 0
      },
      {
        "id": 42,
        "name": "Josefina Marquardt",
        "goals": 0
      },
      {
        "id": 43,
        "name": "Misty Hermiston II",
        "goals": 0
      },
      {
        "id": 44,
        "name": "Dr. Marco Beahan",
        "goals": 0
      },
      {
        "id": 45,
        "name": "Prof. Louvenia Keebler DVM",
        "goals": 0
      },
      {
        "id": 46,
        "name": "Mr. Alexys Gerlach MD",
        "goals": 0
      },
      {
        "id": 47,
        "name": "Christ Zulauf",
        "goals": 0
      },
      {
        "id": 48,
        "name": "Shane Bechtelar I",
        "goals": 0
      },
      {
        "id": 49,
        "name": "Luna Walsh",
        "goals": 0
      },
      {
        "id": 50,
        "name": "Dr. Silas Mills V",
        "goals": 0
      },
      {
        "id": 51,
        "name": "Bernie West",
        "goals": 0
      },
      {
        "id": 52,
        "name": "Casimer Morar",
        "goals": 0
      },
      {
        "id": 53,
        "name": "Karson Mosciski",
        "goals": 0
      },
      {
        "id": 54,
        "name": "Arnaldo Mante",
        "goals": 0
      },
      {
        "id": 55,
        "name": "Willy Williamson",
        "goals": 0
      },
      {
        "id": 56,
        "name": "Consuelo Turcotte",
        "goals": 0
      },
      {
        "id": 57,
        "name": "Javier Murray",
        "goals": 0
      },
      {
        "id": 58,
        "name": "Ted Hessel IV",
        "goals": 0
      },
      {
        "id": 59,
        "name": "Prof. Eladio Spencer I",
        "goals": 0
      },
      {
        "id": 60,
        "name": "Prof. Guido Grimes I",
        "goals": 0
      },
      {
        "id": 61,
        "name": "Nyah Greenholt",
        "goals": 0
      },
      {
        "id": 62,
        "name": "Keira Mohr",
        "goals": 0
      },
      {
        "id": 63,
        "name": "Kiara Schulist",
        "goals": 0
      },
      {
        "id": 64,
        "name": "Odessa Moore",
        "goals": 0
      },
      {
        "id": 65,
        "name": "Ivory Jones III",
        "goals": 0
      },
      {
        "id": 66,
        "name": "Francesco Smitham MD",
        "goals": 0
      },
      {
        "id": 67,
        "name": "Dr. Litzy Reynolds Jr.",
        "goals": 0
      },
      {
        "id": 68,
        "name": "Gonzalo Parisian",
        "goals": 0
      },
      {
        "id": 69,
        "name": "Miss Therese Bergnaum Jr.",
        "goals": 0
      },
      {
        "id": 70,
        "name": "Mrs. Lenore Hammes II",
        "goals": 0
      },
      {
        "id": 71,
        "name": "Terrance Fahey",
        "goals": 0
      },
      {
        "id": 72,
        "name": "Amelia Maggio",
        "goals": 0
      },
      {
        "id": 73,
        "name": "Palma Douglas",
        "goals": 0
      },
      {
        "id": 74,
        "name": "Dr. Carol Hauck DVM",
        "goals": 0
      },
      {
        "id": 75,
        "name": "Hayley Daniel IV",
        "goals": 0
      },
      {
        "id": 76,
        "name": "Benjamin Gleason",
        "goals": 0
      },
      {
        "id": 77,
        "name": "Dr. Hettie Bayer DDS",
        "goals": 0
      },
      {
        "id": 78,
        "name": "Mrs. Missouri Stoltenberg DVM",
        "goals": 0
      },
      {
        "id": 79,
        "name": "Dave Hermann",
        "goals": 0
      },
      {
        "id": 80,
        "name": "Mrs. Nya Grady",
        "goals": 0
      },
      {
        "id": 81,
        "name": "Aimee Shields",
        "goals": 0
      },
      {
        "id": 82,
        "name": "Elnora Stamm",
        "goals": 0
      },
      {
        "id": 83,
        "name": "Ressie Willms",
        "goals": 0
      },
      {
        "id": 84,
        "name": "Dr. Madaline Jacobi V",
        "goals": 0
      },
      {
        "id": 85,
        "name": "Ansley Kirlin",
        "goals": 0
      },
      {
        "id": 86,
        "name": "Madalyn Gibson",
        "goals": 0
      },
      {
        "id": 87,
        "name": "Dr. Clotilde Smith",
        "goals": 0
      },
      {
        "id": 88,
        "name": "Genoveva Pacocha",
        "goals": 0
      }
    ];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getPlayersByTournamentId(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });
});
