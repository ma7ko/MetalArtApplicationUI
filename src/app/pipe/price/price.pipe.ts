import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: number): string {
    if (value) {
      if (currency == 1)
        return (value * 0.018).toFixed(2);
      else if (currency == 2)
        return (value * 0.016).toFixed(2);
      else
        return (value).toFixed(2);
    }
    return "0";
  }

}
