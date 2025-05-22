import { TestBed } from '@angular/core/testing';

import { MarchesService } from './marches.service';

describe('MarchesService', () => {
  let service: MarchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
