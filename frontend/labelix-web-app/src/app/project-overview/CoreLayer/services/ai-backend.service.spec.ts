import { TestBed } from '@angular/core/testing';

import { AiBackendService } from './ai-backend.service';

describe('AiBackendService', () => {
  let service: AiBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
