import { TestBed } from '@angular/core/testing';

import { LabelInfoService } from './label-info.service';

describe('LabelInfoService', () => {
  let service: LabelInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
