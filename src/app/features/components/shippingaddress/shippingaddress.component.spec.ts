import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingaddressComponent } from './shippingaddress.component';

describe('ShippingaddressComponent', () => {
  let component: ShippingaddressComponent;
  let fixture: ComponentFixture<ShippingaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingaddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingaddressComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
