import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SketchHomeComponent } from './sketch-home/sketch-home.component';

const routes: Routes = [
  { path: 'sketch-home', component: SketchHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SketchRoutingModule { }
