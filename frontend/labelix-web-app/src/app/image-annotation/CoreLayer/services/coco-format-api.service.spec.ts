import { TestBed } from '@angular/core/testing';

import { CocoFormatApiService } from './coco-format-api.service';

describe('CocoFormatApiService', () => {
  let service: CocoFormatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocoFormatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
