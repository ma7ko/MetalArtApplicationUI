import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmToIn'
})
export class MmToInPipe implements PipeTransform {

  transform(value: number, arg: string): any {
    if (arg == "mm")
      return value.toFixed(2);
    else 
      return (value * 0.03937008).toFixed(2);;
  }

}
