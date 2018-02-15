import { TestBed, inject } from '@angular/core/testing';

import { PromotoresService } from './promotores.service';

describe('PromotoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotoresService]
    });
  });

  it('should be created', inject([PromotoresService], (service: PromotoresService) => {
    expect(service).toBeTruthy();
  }));
});
