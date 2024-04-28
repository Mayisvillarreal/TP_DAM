import { TestBed } from '@angular/core/testing';

import { ValvulasService } from './valvulas.service';

describe('ValvulasService', () => {
  let service: ValvulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValvulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
