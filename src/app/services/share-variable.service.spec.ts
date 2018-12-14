/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShareVariableService } from './share-variable.service';

describe('Service: ShareVariable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareVariableService]
    });
  });

  it('should ...', inject([ShareVariableService], (service: ShareVariableService) => {
    expect(service).toBeTruthy();
  }));
});
