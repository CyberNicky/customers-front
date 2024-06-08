import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewCustomersComponent } from './register-new-customers.component';

describe('RegisterNewCustomersComponent', () => {
  let component: RegisterNewCustomersComponent;
  let fixture: ComponentFixture<RegisterNewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNewCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterNewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
