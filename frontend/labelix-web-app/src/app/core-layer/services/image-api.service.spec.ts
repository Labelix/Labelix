import { TestBed } from '@angular/core/testing';
import {ImageApi} from './image-api.service';

describe('ImageApiService', () => {
  let service: ImageApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
