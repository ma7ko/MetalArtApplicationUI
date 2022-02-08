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
import { InputShapeComponent } from './input-shape/input-shape.component';
import { ModalComponent } from './modal/modal.component';
import { MmToInPipe } from '../pipe/mm-to-in/mm-to-in.pipe';
import { InputPriceTagComponent } from './input-price-tag/input-price-tag.component';
import { PricePipe } from '../pipe/price/price.pipe';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    NavigationComponent,
    SvgComponent,
    FooterComponent,
    PlaceholderComponent,
    ValidationComponent,
    InputPriceComponent,
    InputDimensionComponent,
    InputShapeComponent,
    ModalComponent,
    MmToInPipe,
    PricePipe,
    InputPriceTagComponent,
    PaginationComponent
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
    InputDimensionComponent,
    InputShapeComponent,
    ModalComponent,
    InputPriceTagComponent,
    PricePipe,
    PaginationComponent
  ]
})
export class SharedModule { }
