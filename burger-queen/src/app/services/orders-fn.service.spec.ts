import { TestBed } from '@angular/core/testing';

import { OrdersFnService } from './orders-fn.service';

describe('OrdersFnService', () => {
  let service: OrdersFnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersFnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
