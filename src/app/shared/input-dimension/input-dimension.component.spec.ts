import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDimensionComponent } from './input-dimension.component';

describe('InputDimensionComponent', () => {
  let component: InputDimensionComponent;
  let fixture: ComponentFixture<InputDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDimensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
