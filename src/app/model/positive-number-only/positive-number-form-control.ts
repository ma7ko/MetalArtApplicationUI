import { FormControl } from "@angular/forms";

export class PositiveNumberFormControl extends FormControl {
    override setValue(value: any, options: any): void {

        console.log(options);
        console.log(value);
        if (value.toString().match(/[^0-9|\.]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.toString().match(/\./gi) && value.toString().match(/\./gi).length > 1) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.toString().startsWith('.')) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.toString().includes('.') && value.toString().indexOf('.') < (value.length - 3)) {
            if (value.length > (parseFloat(value).toFixed(2).length + 1) || !this.value.includes('.')) {
                super.setValue(parseFloat(value).toFixed(2), { ...options, emitModelToViewChange: true });
                return;
            } else {
                super.setValue(this.value, { ...options, emitModelToViewChange: true });
                return;
            }
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
        
    }
}
