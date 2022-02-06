import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SvgComponent } from './svg/svg.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ValidationComponent } from './validation/validation.component';
import { InputPriceComponent } from './input-price/input-price.component';
import { InputDimensionComponent } from './input-dimension/input-dimension.component';



@NgModule({
  declarations: [
    NavigationComponent,
    SvgComponent,
    FooterComponent,
    PlaceholderComponent,
    ValidationComponent,
    InputPriceComponent,
    InputDimensionComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    SvgComponent,
    PlaceholderComponent,
    ValidationComponent,
    InputPriceComponent,
    InputDimensionComponent
  ]
})
export class SharedModule { }
