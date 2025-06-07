import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAssetsComponent } from './player-assets.component';

describe('PlayerAssetsComponent', () => {
  let component: PlayerAssetsComponent;
  let fixture: ComponentFixture<PlayerAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
