import { TestBed } from '@angular/core/testing';

import { GenericApiService } from './generic-api.service';
import {IIdentifiable} from '../contracts/IIdentifiable';

describe('GenericApiService', () => {
  let service: GenericApiService<IIdentifiable>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
