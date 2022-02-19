import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPriceTagComponent } from './input-price-tag.component';

describe('InputPriceTagComponent', () => {
  let component: InputPriceTagComponent;
  let fixture: ComponentFixture<InputPriceTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPriceTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPriceTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
