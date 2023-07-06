import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinner1Component } from './loading-spinner1.component';

describe('LoadingSpinner1Component', () => {
  let component: LoadingSpinner1Component;
  let fixture: ComponentFixture<LoadingSpinner1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinner1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
