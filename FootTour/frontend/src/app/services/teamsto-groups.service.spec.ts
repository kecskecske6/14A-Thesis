import { TestBed } from '@angular/core/testing';

import { TeamstoGroupsService } from './teamsto-groups.service';

describe('TeamstoGroupsService', () => {
  let service: TeamstoGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamstoGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
