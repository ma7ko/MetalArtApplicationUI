import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: number): string {
    if (value) {
      if (currency == 1)
        return (value * 0.88).toFixed(2);
      else if (currency == 2)
        return (value * 53.62).toFixed(2);
      else
        return (value).toFixed(2);
    }
    return "0";
  }

}
