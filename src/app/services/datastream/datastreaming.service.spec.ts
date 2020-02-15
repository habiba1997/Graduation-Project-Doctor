import { TestBed } from '@angular/core/testing';

import { DatastreamingService } from './datastreaming.service';

describe('DatastreamingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastreamingService = TestBed.get(DatastreamingService);
    expect(service).toBeTruthy();
  });
});
