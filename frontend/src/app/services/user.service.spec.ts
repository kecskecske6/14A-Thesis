import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserModel } from '../models/User';

import { UserService } from './user.service';

describe('UserService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])
    service = new UserService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getByType should return value from observable', (done: DoneFn) => {
    let expectedResult: UserModel[] = [
      {
        "id": 1,
        "name": "Admin",
        "email": "admin",
        "password": "$2y$10$XY84Pwd1oemxTIbUZi2v6.kvEwqvxXG3r.fP/kOjSRthQect.B7.2",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      },
      {
        "id": 2,
        "name": "Terrance Turner",
        "email": "echamplin@gmail.com",
        "password": "$2y$10$nQlekjBBVim.o2jlzDuFlulupKMgPGOJi0lmbyxpZIgF85L8oyWu6",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      },
      {
        "id": 3,
        "name": "Ms. Scarlett Gaylord",
        "email": "orion.parisian@hotmail.com",
        "password": "$2y$10$55eXgRpBzc//C.0GNXkF/eFFJTXV6jkF8sG.sIASDauuzW1xQowMm",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      },
      {
        "id": 4,
        "name": "Evalyn Schuppe",
        "email": "winnifred.smith@ritchie.com",
        "password": "$2y$10$BFGIBBoY0Eib6ZscTt/mvegQyLTPmRn9z9SF6lfV6zQL5hrwsTu0K",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      },
      {
        "id": 5,
        "name": "Prof. Jennie Effertz V",
        "email": "candelario.stracke@hotmail.com",
        "password": "$2y$10$vZxr3q.a2mhpS8dPq63BqO4.8SPgu37tyFrb00SgulWm/B6TBMl7.",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      },
      {
        "id": 6,
        "name": "Mrs. Rachael Barrows IV",
        "email": "chad.cassin@hotmail.com",
        "password": "$2y$10$6mJk8m1UJ4ywEeE5by4IjOmz0VjHy1ac3yPEMN0fzGEhalwe0uT8K",
        "isDeleted": false,
        "isOrganizer": true,
        "isReferee": true,
        "isLeader": true
      }
    ];
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getByType('referee').subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

  it('#getById should return value from observable', (done: DoneFn) => {
    let expectedResult = 'Admin';
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getById(1).subscribe({
      next: result => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: done.fail
    });
  });

});
