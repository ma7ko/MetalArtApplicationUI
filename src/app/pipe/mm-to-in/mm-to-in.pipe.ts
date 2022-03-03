import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmToIn'
})
export class MmToInPipe implements PipeTransform {

  transform(value: number, arg: string): any {
    console.log("In Pipe");
    console.log(value);
    console.log(arg);
    console.log(value.toFixed(2));
    if (arg == "mm")
      return value.toFixed(2);
    else 
      return (value * 0.03937008).toFixed(2);;
  }

}
