import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SketchRoutingModule } from './sketch-routing.module';
import { SketchHomeComponent } from './sketch-home/sketch-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SketchHomeComponent
  ],
  imports: [
    CommonModule,
    SketchRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class SketchModule { }
