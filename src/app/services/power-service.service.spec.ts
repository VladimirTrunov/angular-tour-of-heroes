import { TestBed } from '@angular/core/testing';

import { PowerService } from './power-service.service';

describe('PowerServiceService', () => {
  let service: PowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
