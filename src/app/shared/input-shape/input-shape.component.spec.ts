import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputShapeComponent } from './input-shape.component';

describe('InputShapeComponent', () => {
  let component: InputShapeComponent;
  let fixture: ComponentFixture<InputShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
