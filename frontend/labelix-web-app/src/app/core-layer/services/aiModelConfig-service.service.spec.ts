import { TestBed } from '@angular/core/testing';
import {AiModelConfigServiceService} from './aiModelConfig-service.service ';

describe('ProjectServiceService', () => {
  let service: AiModelConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiModelConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
