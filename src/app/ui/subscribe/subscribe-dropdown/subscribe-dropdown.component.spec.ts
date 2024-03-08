import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeDropdownComponent } from './subscribe-dropdown.component';

describe('SubscribeDropdownComponent', () => {
  let component: SubscribeDropdownComponent;
  let fixture: ComponentFixture<SubscribeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscribeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
