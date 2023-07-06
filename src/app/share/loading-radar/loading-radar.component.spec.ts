import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRadarComponent } from './loading-radar.component';

describe('LoadingRadarComponent', () => {
  let component: LoadingRadarComponent;
  let fixture: ComponentFixture<LoadingRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingRadarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
