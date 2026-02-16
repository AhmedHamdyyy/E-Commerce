import { TestBed } from '@angular/core/testing';

import { CheckPlatFormService } from './check-plat-form.service';

describe('CheckPlatFormService', () => {
  let service: CheckPlatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPlatFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
