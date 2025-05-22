import { TestBed } from '@angular/core/testing';

import { ProfilCommercantService } from './profil-commercant.service';

describe('ProfilCommercantService', () => {
  let service: ProfilCommercantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilCommercantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
