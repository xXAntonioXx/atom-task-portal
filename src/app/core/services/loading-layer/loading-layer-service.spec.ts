import { TestBed } from '@angular/core/testing';

import { LoadingLayerService } from './loading-layer-service';

describe('LoadingLayerService', () => {
  let service: LoadingLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
