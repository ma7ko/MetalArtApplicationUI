import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SketchHomeComponent } from './sketch-home/sketch-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'sketch-home', component: SketchHomeComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SketchRoutingModule { }
