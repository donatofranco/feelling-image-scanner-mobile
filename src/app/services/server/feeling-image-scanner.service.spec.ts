import { TestBed } from '@angular/core/testing';

import { FeelingImageScannerService } from './feeling-image-scanner.service';

describe('FeelingImageScannerService', () => {
  let service: FeelingImageScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeelingImageScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
