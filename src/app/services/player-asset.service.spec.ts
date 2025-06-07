import { TestBed } from '@angular/core/testing';

import { PlayerAssetService } from './player-asset.service';

describe('PlayerAssetService', () => {
  let service: PlayerAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
