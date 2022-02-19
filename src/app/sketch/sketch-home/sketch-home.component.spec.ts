import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchHomeComponent } from './sketch-home.component';

describe('SketchHomeComponent', () => {
  let component: SketchHomeComponent;
  let fixture: ComponentFixture<SketchHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SketchHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
