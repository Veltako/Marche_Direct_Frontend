import { TestBed } from '@angular/core/testing';

import { FormContactService } from './form-contact.service';

describe('FormContactService', () => {
  let service: FormContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
