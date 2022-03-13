import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SketchRoutingModule } from './sketch-routing.module';
import { SketchHomeComponent } from './sketch-home/sketch-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    SketchHomeComponent,
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    SketchRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class SketchModule { }
