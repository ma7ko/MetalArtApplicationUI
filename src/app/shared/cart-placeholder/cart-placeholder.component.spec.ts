import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPlaceholderComponent } from './cart-placeholder.component';

describe('CartPlaceholderComponent', () => {
  let component: CartPlaceholderComponent;
  let fixture: ComponentFixture<CartPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
